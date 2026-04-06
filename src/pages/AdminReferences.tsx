import { useState } from "react";
import { Table, Button, Modal, Form, Input, Popconfirm, message } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../lib/axios";
import type { Reference } from "../types/api";

export function AdminReferences() {
  const queryClient = useQueryClient();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form] = Form.useForm();

  const { data: references, isLoading } = useQuery({
    queryKey: ["references"],
    queryFn: async () => {
      const response = await api.get<Reference[]>("/references/");
      return response.data;
    },
  });

  const createMutation = useMutation({
    mutationFn: async (data: { name: string; description?: string }) => {
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
      data: { name?: string; description?: string };
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
      name: record.name,
      description: record.description,
    });
    setModalOpen(true);
  };

  const handleSubmit = (values: { name: string; description?: string }) => {
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
      dataIndex: "name",
      key: "name",
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
            name="name"
            label="Nome"
            rules={[{ required: true, message: "Campo obrigatório" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item name="description" label="Descrição">
            <Input.TextArea rows={3} />
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
