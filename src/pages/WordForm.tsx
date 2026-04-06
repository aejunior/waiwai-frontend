import { useEffect } from "react";
import { Form, Input, Select, Button, Card, message } from "antd";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import api from "../lib/axios";
import type {
  WordCreate,
  WordUpdate,
  Category,
  WordDetails,
} from "../types/api";

export function WordForm() {
  const { word_id } = useParams<{ word_id: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [form] = Form.useForm();
  const isEditing = !!word_id;

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await api.get<{ data: Category[] }>("/categories/");
      return response.data.data;
    },
  });

  const { data: word } = useQuery({
    queryKey: ["word", word_id],
    queryFn: async () => {
      const response = await api.get<WordDetails>(`/words/${word_id}`);
      return response.data;
    },
    enabled: isEditing,
  });

  useEffect(() => {
    if (word) {
      form.setFieldsValue({
        word: word.word,
        phonemic: word.phonemic,
        categories: word.categories.map((c) => c.id),
      });
    }
  }, [word, form]);

  const createMutation = useMutation({
    mutationFn: async (data: WordCreate) => {
      const response = await api.post("/words/", data);
      return response.data.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["my-words"] });
      message.success("Palavra criada com sucesso!");
      navigate("/words/" + data.id);
    },
    onError: () => {
      message.error("Erro ao criar palavra");
    },
  });

  const updateMutation = useMutation({
    mutationFn: async (data: WordUpdate) => {
      await api.put(`/words/${word_id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["word", word_id] });
      queryClient.invalidateQueries({ queryKey: ["my-words"] });
      message.success("Palavra atualizada com sucesso!");
      navigate(`/words/${word_id}`);
    },
    onError: () => {
      message.error("Erro ao atualizar palavra");
    },
  });

  const onFinish = (values: WordCreate | WordUpdate) => {
    if (isEditing) {
      updateMutation.mutate(values);
    } else {
      createMutation.mutate(values as WordCreate);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Card title={isEditing ? "Editar Palavra" : "Nova Palavra"}>
        <Form
          form={form}
          onFinish={onFinish}
          layout="vertical"
          autoComplete="off"
        >
          <Form.Item
            name="word"
            label="Palavra"
            rules={[{ required: true, message: "Campo obrigatório" }]}
          >
            <Input placeholder="Digite a palavra" size="large" />
          </Form.Item>

          <Form.Item name="phonemic" label="Fonética">
            <Input placeholder="Transcrição fonética" size="large" />
          </Form.Item>

          <Form.Item
            name="categories"
            label="Categorias"
            rules={[
              { required: true, message: "Selecione ao menos uma categoria" },
            ]}
          >
            <Select
              mode="multiple"
              placeholder="Selecione as categorias"
              size="large"
              options={categories?.map((cat) => ({
                label: cat.category,
                value: cat.id,
              }))}
            />
          </Form.Item>

          <Form.Item>
            <div className="flex gap-2">
              <Button
                onClick={() =>
                  navigate(isEditing ? `/words/${word_id}` : "/me/words")
                }
                size="large"
              >
                Cancelar
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                loading={createMutation.isPending || updateMutation.isPending}
                size="large"
                className="flex-1"
              >
                {isEditing ? "Atualizar" : "Criar"}
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}
