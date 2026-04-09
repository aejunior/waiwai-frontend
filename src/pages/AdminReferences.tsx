import { useState } from "react";
import { Table, Button, Modal, Form, Input, Popconfirm, App } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../lib/axios";
import type { Reference } from "../types/api";

export function AdminReferences() {
  const { message } = App.useApp();
  const queryClient = useQueryClient();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form] = Form.useForm();

  const { data: references, isLoading } = useQuery({
    queryKey: ["references"],
    queryFn: async () => {
      const response = await api.get<{ data: Reference[] }>("/references/");
      return response.data.data;
    },
  });

  const createMutation = useMutation({
    mutationFn: async (data: {
      reference: string;
      authors: string;
      year: number;
      url?: string;
    }) => {
      await api.post("/references/", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["references"] });
      message.success("Referência criada!");
      setModalOpen(false);
      form.resetFields();
    },
    onError: () => {
      message.error("Erro ao criar referência");
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: number;
      data: {
        reference: string;
        authors: string;
        year: number;
        url?: string;
      };
    }) => {
      await api.put(`/references/${id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["references"] });
      message.success("Referência atualizada!");
      setModalOpen(false);
      setEditingId(null);
      form.resetFields();
    },
    onError: () => {
      message.error("Erro ao atualizar referência");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      await api.delete(`/references/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["references"] });
      message.success("Referência excluída!");
    },
    onError: () => {
      message.error("Erro ao excluir referência");
    },
  });

  const handleEdit = (record: Reference) => {
    setEditingId(record.id);
    form.setFieldsValue({
      reference: record.reference,
      authors: record.authors,
      year: record.year,
      url: record.url,
    });
    setModalOpen(true);
  };

  const handleSubmit = (values: {
    reference: string;
    authors: string;
    year: number;
    url?: string;
  }) => {
    if (editingId) {
      updateMutation.mutate({ id: editingId, data: values });
    } else {
      createMutation.mutate(values);
    }
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: 80,
    },
    {
      title: "Obra/Título",
      dataIndex: "reference",
      key: "reference",
    },
    {
      title: "Autores",
      dataIndex: "authors",
      key: "authors",
    },
    {
      title: "Ano",
      dataIndex: "year",
      key: "year",
      width: 100,
    },
    {
      title: "URL",
      dataIndex: "url",
      key: "url",
      render: (url: string) =>
        url ? (
          <a href={url} target="_blank" rel="noopener noreferrer">
            Link
          </a>
        ) : (
          "-"
        ),
    },
    {
      title: "Ações",
      key: "actions",
      width: 150,
      render: (_: unknown, record: Reference) => (
        <div className="flex gap-2">
          <Button
            icon={<EditOutlined />}
            size="small"
            onClick={() => handleEdit(record)}
          />
          <Popconfirm
            title="Excluir referência?"
            onConfirm={() => deleteMutation.mutate(record.id)}
          >
            <Button danger icon={<DeleteOutlined />} size="small" />
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Gerenciar Referências</h1>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => {
            setEditingId(null);
            form.resetFields();
            setModalOpen(true);
          }}
        >
          Nova Referência
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={references}
        loading={isLoading}
        rowKey="id"
      />

      <Modal
        title={editingId ? "Editar Referência" : "Nova Referência"}
        open={modalOpen}
        onCancel={() => {
          setModalOpen(false);
          setEditingId(null);
          form.resetFields();
        }}
        footer={null}
      >
        <Form form={form} onFinish={handleSubmit} layout="vertical">
          <Form.Item
            name="reference"
            label="Título da Referência"
            rules={[{ required: true, message: "Campo obrigatório" }]}
          >
            <Input placeholder="Ex: Dicionário WaiWai Vol 1" />
          </Form.Item>

          <Form.Item
            name="authors"
            label="Autores"
            rules={[{ required: true, message: "Campo obrigatório" }]}
          >
            <Input placeholder="Ex: Silva, J.; Santos, M." />
          </Form.Item>

          <div className="flex gap-4">
            <Form.Item
              name="year"
              label="Ano"
              className="flex-1"
              rules={[{ required: true, message: "Campo obrigatório" }]}
            >
              <Input type="number" placeholder="2024" />
            </Form.Item>

            <Form.Item name="url" label="URL (opcional)" className="flex-[2]">
              <Input placeholder="https://..." />
            </Form.Item>
          </div>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full"
              loading={createMutation.isPending || updateMutation.isPending}
            >
              {editingId ? "Atualizar" : "Criar"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
