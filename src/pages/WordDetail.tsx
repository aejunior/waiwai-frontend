import {
  Card,
  Tag,
  Button,
  Spin,
  Popconfirm,
  message,
  Modal,
  Form,
  Input,
  Select,
  Upload,
  Image,
  List,
  Typography,
  Divider,
  UploadFile,
  UploadProps,
  Result,
  Space,
} from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  UploadOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import api from "../lib/axios";
import { useAuthStore } from "../store/authStore";
import type {
  WordDetails,
  MeaningUpdate,
  Reference,
  WordMeaning,
  Category,
  WordUpdate,
  WordReviewCreate,
  WordStatus,
} from "../types/api";
import { API_URL } from "../constains";
import {
  useCreateMeaning,
  useDeleteMeaning,
  useEditMeaning,
} from "../hooks/useMeaning";
import fnErrorMessage from "../utils/fnErrorMessage";
import { hasPermission } from "../utils/permissions";

const { Title, Text } = Typography;

export function WordDetail() {
  const navigate = useNavigate();
  const { word_id } = useParams<{ word_id: string }>();
  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const queryClient = useQueryClient();
  const [meaningModalOpen, setMeaningModalOpen] = useState(false);
  const [editingMeaning, setEditingMeaning] = useState<number | null>(null);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [fileModalOpen, setFileModalOpen] = useState(false);
  const [editWordModalOpen, setEditWordModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [formWord] = Form.useForm();
  const [formReview] = Form.useForm<WordReviewCreate>();

  const {
    mutate: editingMeaningMutation,
    isPending: isPedingUpdateMeaningMutation,
  } = useEditMeaning(() => {
    setEditingMeaning(null);
    setMeaningModalOpen(false);
    form.resetFields();
  });
  const {
    mutate: createMeaningMutation,
    isPending: isPendingCreateMeaningMutation,
  } = useCreateMeaning(() => {
    setMeaningModalOpen(false);
    form.resetFields();
  });
  const {
    mutate: deleteMeaningMutation,
    isPending: isPendingDeleteMeaningMutation,
  } = useDeleteMeaning();

  const {
    data: word,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["word", word_id],
    queryFn: async () => {
      const response = await api.get<{ data: WordDetails }>(
        `/words/${word_id}`
      );
      return response.data.data;
    },
  });

  const { data: references } = useQuery({
    queryKey: ["references"],
    queryFn: async () => {
      const response = await api.get<{ data: Reference[] }>("/references/");
      return response.data.data;
    },
    enabled: meaningModalOpen,
  });

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await api.get<{ data: Category[] }>("/categories/");
      return response.data.data;
    },
    enabled: editWordModalOpen,
  });

  const editWordMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: WordUpdate }) => {
      await api.put(`/words/${id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["word", word_id] });
      const msg = isAdmin 
        ? "Palavra atualizada!" 
        : "Palavra atualizada! Ela foi enviada novamente para revisão.";
      message.success(msg);
      setEditWordModalOpen(false);
    },
    onError: (error: Error) => {
      message.error(fnErrorMessage(error));
    },
  });

  const addReviewMutation = useMutation({
    mutationFn: async (data: WordReviewCreate) => {
      await api.post(`/words/${word_id}/reviews`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["word", word_id] });
      message.success("Revisão registrada com sucesso!");
      formReview.resetFields();
    },
    onError: (error: Error) => {
      message.error(fnErrorMessage(error));
    },
  });

  const deleteWordMutation = useMutation({
    mutationFn: async () => {
      await api.delete(`/words/${word_id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-words"] });
      message.success("Palavra excluída!");
      navigate(-1);
    },
    onError: (error) => {
      message.error(fnErrorMessage(error));
    },
  });

  const deleteAttachmentMutation = useMutation({
    mutationFn: async (attachmentId: number) => {
      await api.delete(`/attachments/${attachmentId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["word", word_id] });
      message.success("Anexo excluído!");
    },
    onError: (error) => {
      message.error(fnErrorMessage(error));
    },
  });

  const handleMeaningSubmit = (values: MeaningUpdate) => {
    if (editingMeaning) {
      editingMeaningMutation({ id: editingMeaning, data: values });
    } else {
      createMeaningMutation({ id: word_id, data: values });
    }
  };

  const handleWordSubmit = (values: WordUpdate) => {
    editWordMutation.mutate({ id: word_id!, data: values });
  };

  const handleEditMeaning = (meaning: WordMeaning) => {
    setEditingMeaning(meaning.id);
    form.setFieldsValue({
      meaning_pt: meaning.meaning_pt,
      meaning_ww: meaning.meaning_ww,
      comment_pt: meaning.comment_pt,
      comment_ww: meaning.comment_ww,
      reference_id: meaning.reference.id,
    });
    setMeaningModalOpen(true);
  };

  const handleEditWord = (values: WordUpdate) => {
    formWord.setFieldsValue(values);
    setEditWordModalOpen(true);
  };

  const uploadProps: UploadProps = {
    name: "file",
    multiple: true,
    accept: "image/jpeg,image/png,image/webp,audio/wav,audio/mp3,audio/ogg",
    action: `${api.defaults.baseURL}/words/${word_id}/attachments/`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
    beforeUpload: (file: File) => {
      if (!word_id) {
        message.warning(
          "Por favor, selecione uma palavra para enviar o arquivo"
        );
        return Upload.LIST_IGNORE;
      }
      const timestamp = Date.now();
      const type = file.type.startsWith("image") ? "image" : "audio";
      const extension = file.name.includes(".")
        ? file.name.split(".").pop()
        : "";
      const newFileName = `${type}_${timestamp}.${extension}`;

      const renamedFile = new File([file], newFileName, { type: file.type });

      return renamedFile;
    },
    fileList: fileList,
    onChange(info) {
      const newFileList = [...info.fileList];
      if (info.file.status === "done") {
        message.success("Arquivo enviado com sucesso!");
        queryClient.invalidateQueries({ queryKey: ["word", word_id] });
      } else if (info.file.status === "error") {
        message.error(
          info.file.error.status === 401
            ? "Error ao enviar o arquivo: Token expirado, autentique-se novamente."
            : fnErrorMessage(info.file.error)
        );
      }

      setFileList(newFileList);
    },
  };

  const actions = (meaning: WordMeaning) => [
    <EditOutlined key="edit" onClick={() => handleEditMeaning(meaning)} />,
    <Popconfirm
      title="Excluir significado?"
      onConfirm={() => deleteMeaningMutation(meaning.id)}
    >
      <Button danger type="text" icon={<DeleteOutlined />} size="small" />
    </Popconfirm>,
  ];

  const handleDeleteWord = () => {
    deleteWordMutation.mutate();
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[75vh]">
        <Spin size="large" />
      </div>
    );
  }

  if (!word)
    return (
      <div className="flex justify-center items-center h-[75vh]">
        <Result
          status="404"
          title="Palavra não encontrada"
          extra={
            <Space>
              <Button type="primary" onClick={() => navigate(-1)}>
                Voltar
              </Button>
            </Space>
          }
        />
      </div>
    );

  const attachments = word.attachments || [];

  const audioAttachments = attachments.filter((att) =>
    att.content_type.startsWith("audio/")
  );

  const imageAttachments = attachments.filter(
    (att) => !att.content_type.startsWith("audio/")
  );

  const formatReference = (ref: Reference) =>
    `${ref.reference}, ${ref.authors} ${ref.year}.`;

  const cardsLoading =
    isPedingUpdateMeaningMutation ||
    isPendingCreateMeaningMutation ||
    isPendingDeleteMeaningMutation ||
    isLoading ||
    isFetching ||
    deleteAttachmentMutation.isPending ||
    deleteWordMutation.isPending;

  const hasEdit =
    isAuthenticated && hasPermission(user?.permission || "GUEST", "USER");

  const isAdmin = hasPermission(user?.permission || "GUEST", "ADMIN");
  const isOwner = isAuthenticated && word?.user_id === user?.id;

  /** Mapeia o status para a cor e o label do badge Ant Design. */
  const statusConfig: Record<WordStatus, { color: string; label: string }> = {
    APPROVED: { color: "success", label: "Aprovada" },
    PENDING: { color: "warning", label: "Pendente de aprovação" },
    REJECTED: { color: "error", label: "Rejeitada" },
    CHANGES_REQUESTED: { color: "processing", label: "Alterações necessárias" },
  };

  return (
    <div className="space-y-6">
      <Button
        disabled={cardsLoading}
        icon={<ArrowLeftOutlined />}
        onClick={() => navigate(-1)}
      >
        Voltar
      </Button>
      <Card loading={cardsLoading}>
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold mb-2">{word.word}</h1>
          {hasEdit && (
            <div className="flex gap-2">
              <Button
                onClick={() =>
                  handleEditWord({
                    word: word.word,
                    phonemic: word.phonemic || "",
                    categories: word.categories.map((cat) => cat.id),
                  })
                }
                disabled={cardsLoading}
                type="primary"
                icon={<EditOutlined />}
              >
                Editar
              </Button>
              <Popconfirm
                title="Excluir palavra? Está ação não pode ser desfeita."
                onConfirm={handleDeleteWord}
              >
                <Button icon={<DeleteOutlined />}>Excluir</Button>
              </Popconfirm>
            </div>
          )}
        </div>
        {word.phonemic && (
          <p className="text-xl text-gray-600 mb-4">/{word.phonemic}/</p>
        )}
        <div className="flex flex-wrap gap-1 items-center">
          {word.categories?.map((cat) => (
            <Tag key={cat.id}>{cat.category}</Tag>
          ))}
          {/* Badge de status – visível para o owner ou ADMIN */}
          {(isOwner || isAdmin) && word.status !== "APPROVED" && (() => {
            const cfg = statusConfig[word.status as WordStatus];
            return <Tag color={cfg.color}>{cfg.label}</Tag>;
          })()}
          {word.status === "APPROVED" && (
            <Tag color="success">Aprovada</Tag>
          )}
        </div>
      </Card>

      <Card
        title="Significados"
        loading={cardsLoading}
        extra={
          hasEdit && (
            <Button
              type="primary"
              icon={<PlusOutlined />}
              disabled={cardsLoading}
              onClick={() => {
                setEditingMeaning(null);
                form.resetFields();
                setMeaningModalOpen(true);
              }}
            >
              Adicionar
            </Button>
          )
        }
      >
        {word.meanings?.length > 0 ? (
          <div className="space-y-4">
            {word.meanings?.map((meaning) => (
              <Card
                key={meaning.id}
                size="small"
                actions={isAuthenticated ? actions(meaning) : undefined}
                loading={cardsLoading}
              >
                <div className="flex flex-col gap-4 justify-between items-start lg:flex-row">
                  <div className="flex-1">
                    {meaning.meaning_ww && (
                      <p className="font-semibold mb-1">
                        WW: {meaning.meaning_ww}
                      </p>
                    )}
                    {meaning.comment_ww && (
                      <p className="text-gray-600 text-sm mb-2">
                        {meaning.comment_ww}
                      </p>
                    )}
                    <Divider />
                    <p className="font-semibold mb-1">
                      PT: {meaning.meaning_pt}
                    </p>
                    {meaning.comment_pt && (
                      <p className="text-gray-600 text-sm mb-2">
                        {meaning.comment_pt}
                      </p>
                    )}
                    <Divider />
                    <Text
                      underline={
                        (meaning.reference.url &&
                          meaning?.reference?.url?.length > 0) ||
                        false
                      }
                      onClick={() =>
                        meaning?.reference?.url
                          ? window.open(meaning.reference.url!, "_blank")
                          : undefined
                      }
                      style={{
                        cursor:
                          meaning.reference.url &&
                          meaning?.reference?.url?.length > 0
                            ? "pointer"
                            : "",
                      }}
                      type="secondary"
                      className="lg:w-full text-xs"
                    >
                      {formatReference(meaning.reference)}
                    </Text>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">Nenhum significado cadastrado</p>
        )}
      </Card>

      <Card
        title="Anexos"
        loading={cardsLoading}
        extra={
          hasEdit && (
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => setFileModalOpen(true)}
              disabled={cardsLoading}
            >
              Adicionar
            </Button>
          )
        }
      >
        {attachments?.length > 0 ? (
          <div className="space-y-4">
            {imageAttachments.length > 0 && (
              <div>
                <Title level={5}>Imagens ({imageAttachments.length}) </Title>
                <List
                  dataSource={imageAttachments}
                  renderItem={(item) => (
                    <List.Item key={item.id}>
                      <div className="flex items-center gap-1">
                        <Image
                          className="object-center"
                          src={`${API_URL}${item.url}`}
                          width={150}
                          height={150}
                        />
                        {hasEdit && (
                          <Popconfirm
                            title="Excluir anexo?"
                            onConfirm={() =>
                              deleteAttachmentMutation.mutate(item.id)
                            }
                          >
                            <Button
                              danger
                              type="text"
                              icon={<DeleteOutlined />}
                            />
                          </Popconfirm>
                        )}
                      </div>
                    </List.Item>
                  )}
                  grid={{
                    gutter: 8,
                    xs: 1,
                    sm: 2,
                    md: 3,
                    lg: 4,
                    xl: 5,
                    xxl: 6,
                  }}
                />
              </div>
            )}
            {audioAttachments.length > 0 && (
              <div>
                <Title level={5}>Áudios ({audioAttachments.length})</Title>
                <div className="grid grid-cols-3 gap-2">
                  {audioAttachments.map((item) => (
                    <div key={item.id} className="flex items-center gap-2">
                      <audio controls>
                        <source
                          src={`${API_URL}${item.url}`}
                          type={item.content_type}
                        />
                      </audio>
                      {hasEdit && (
                        <Popconfirm
                          title="Excluir anexo?"
                          onConfirm={() =>
                            deleteAttachmentMutation.mutate(item.id)
                          }
                        >
                          <Button
                            danger
                            type="text"
                            icon={<DeleteOutlined />}
                          />
                        </Popconfirm>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <p className="text-gray-500">Nenhum anexo disponível</p>
        )}
      </Card>

      {/* --- Histórico de Revisões ---
          Visível para: ADMIN (vê todas) e o próprio dono da palavra (vê as suas). */}
      {(isAdmin || isOwner) && (
        <Card title="Histórico de Revisões" loading={cardsLoading}>
          {word.reviews?.length > 0 ? (
            <List
              dataSource={word.reviews}
              renderItem={(review: import('../types/api').WordReview) => {
                const cfg = statusConfig[review.status];
                return (
                  <List.Item key={review.id}>
                    <div className="flex flex-col gap-1 w-full">
                      <div className="flex items-center gap-2">
                        <Tag color={cfg.color}>{cfg.label}</Tag>
                        <Text type="secondary" className="text-xs">
                          {new Date(review.created_at).toLocaleString("pt-BR")}
                        </Text>
                      </div>
                      {review.comment && (
                        <Text className="text-sm">{review.comment}</Text>
                      )}
                    </div>
                  </List.Item>
                );
              }}
            />
          ) : (
            <p className="text-gray-500">Nenhuma revisão registrada ainda.</p>
          )}
        </Card>
      )}

      {/* --- Painel de Revisão (exclusivo ADMIN) --- */}
      {isAdmin && (
        <Card title="Registrar Revisão">
          <Form
            form={formReview}
            layout="vertical"
            onFinish={(values: WordReviewCreate) =>
              addReviewMutation.mutate(values)
            }
          >
            <Form.Item
              name="status"
              label="Decisão"
              rules={[{ required: true, message: "Selecione uma decisão" }]}
            >
              <Select
                placeholder="Selecione o status"
                options={[
                  { label: "✅ Aprovar", value: "APPROVED" },
                  { label: "❌ Rejeitar", value: "REJECTED" },
                  {
                    label: "✏️ Solicitar alterações",
                    value: "CHANGES_REQUESTED",
                  },
                ]}
              />
            </Form.Item>
            <Form.Item name="comment" label="Comentário (opcional)">
              <Input.TextArea
                rows={3}
                maxLength={1000}
                showCount
                placeholder="Deixe um feedback para o autor..."
              />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={addReviewMutation.isPending}
              >
                Enviar revisão
              </Button>
            </Form.Item>
          </Form>
        </Card>
      )}

      <Modal
        title={editingMeaning ? "Editar Significado" : "Adicionar Significado"}
        width={800}
        open={meaningModalOpen}
        onCancel={() => {
          setMeaningModalOpen(false);
          setEditingMeaning(null);
          form.resetFields();
        }}
        footer={null}

      >
        <Form form={form} onFinish={handleMeaningSubmit} layout="vertical">
          <Form.Item
            name="meaning_ww"
            label="Significado (WaiWai)"
            rules={[{ required: true, message: "Campo obrigatório" }]}
          >
            <Input.TextArea rows={3} />
          </Form.Item>
          <Form.Item
            name="comment_ww"
            label="Comentários em WaiWai"
            rules={[{ required: true, message: "Campo obrigatório" }]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>

          <Form.Item
            name="meaning_pt"
            label="Significado (Português)"
            rules={[{ required: true, message: "Campo obrigatório" }]}
          >
            <Input.TextArea rows={3} />
          </Form.Item>

          <Form.Item
            name="comment_pt"
            label="Comentários em Português"
            rules={[{ required: true, message: "Campo obrigatório" }]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>

          <Form.Item
            name="reference_id"
            label="Referência"
            rules={[{ required: true, message: "Campo obrigatório" }]}
          >
            <Select
              placeholder="Selecione uma referência"
              options={references?.map((ref) => ({
                label: formatReference(ref),
                value: ref.id,
              }))}
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full"
              loading={
                isPendingCreateMeaningMutation || isPedingUpdateMeaningMutation
              }
            >
              {editingMeaning ? "Atualizar" : "Adicionar"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="Enviar arquivo"
        open={fileModalOpen}
        onCancel={() => {
          setFileList([]);
          setFileModalOpen(false);
        }}
        footer={null}
      >
        <Upload.Dragger {...uploadProps}>
          <p className="ant-upload-drag-icon">
            <UploadOutlined />
          </p>
          <p className="ant-upload-text">Clique, arraste ou solte o arquivo</p>
          <p className="ant-upload-hint">
            Apenas arquivos de imagem ou áudio são permitidos
          </p>
        </Upload.Dragger>
      </Modal>
      <Modal
        title="Editar palavra"
        open={editWordModalOpen}
        onCancel={() => {
          setEditWordModalOpen(false);
        }}
        footer={null}
      >
        <Form form={formWord} onFinish={handleWordSubmit} layout="vertical">
          <Form.Item
            name="word"
            label="Palavra"
            rules={[{ required: true, message: "Campo obrigatório" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="phonemic"
            label="Fonética"
            rules={[{ required: true, message: "Campo obrigatório" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="categories"
            label="Categorias"
            rules={[{ required: true, message: "Campo obrigatório" }]}
          >
            <Select
              mode="multiple"
              placeholder="Selecione as categorias"
              options={categories?.map((cat) => ({
                label: cat.category,
                value: cat.id,
              }))}
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full"
              loading={editWordMutation.isPending}
            >
              Salvar
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
