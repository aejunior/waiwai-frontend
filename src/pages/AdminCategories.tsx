import { useState } from "react";
import { Table, Button, Modal, Form, Input, Popconfirm, message } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../lib/axios";
import type { Category } from "../types/api";

export function AdminCategories() {
  const queryClient = useQueryClient();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form] = Form.useForm();

  const { data: categories, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await api.get<{ data: Category[] }>("/categories/");
      return response.data.data;
    },
  });

  const createMutation = useMutation({
    mutationFn: async (data: { name: string }) => {
      await api.post("/categories/", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      message.success("Categoria criada!");
      setModalOpen(false);
      form.resetFields();
    },
    onError: () => {
      message.error("Erro ao criar categoria");
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: number;
      data: { name: string };
    }) => {
      await api.put(`/categories/${id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      message.success("Categoria atualizada!");
      setModalOpen(false);
      setEditingId(null);
      form.resetFields();
    },
    onError: () => {
      message.error("Erro ao atualizar categoria");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      await api.delete(`/categories/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      message.success("Categoria excluída!");
    },
    onError: () => {
      message.error("Erro ao excluir categoria");
    },
  });

  const handleEdit = (record: Category) => {
    setEditingId(record.id);
    form.setFieldsValue({
      category: record.category,
      description: record.description,
    });
    setModalOpen(true);
  };

  const handleSubmit = (values: { category: string; description: string }) => {
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
      title: "Nome",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Descrição",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Ações",
      key: "actions",
      width: 150,
      render: (_: unknown, record: Category) => (
        <div className="flex gap-2">
          <Button
            icon={<EditOutlined />}
            size="small"
            onClick={() => handleEdit(record)}
          />
          <Popconfirm
            title="Excluir categoria?"
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
        <h1 className="text-2xl font-bold">Gerenciar Categorias</h1>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => {
            setEditingId(null);
            form.resetFields();
            setModalOpen(true);
          }}
        >
          Nova Categoria
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={categories}
        loading={isLoading}
        rowKey="id"
      />

      <Modal
        title={editingId ? "Editar Categoria" : "Nova Categoria"}
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
            name="category"
            label="Nome"
            rules={[{ required: true, message: "Campo obrigatório" }]}
          >
            <Input placeholder="Ex: Fauna, Flora, Objetos" />
          </Form.Item>

          <Form.Item
            name="description"
            label="Descrição"
            rules={[{ required: true, message: "Campo obrigatório" }]}
          >
            <Input.TextArea rows={3} placeholder="Breve descrição da categoria" />
          </Form.Item>

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
