import { Table, Button, Tag, Space, Tooltip, Card, App } from "antd";
import { UserOutlined, CrownOutlined } from "@ant-design/icons";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../lib/axios";
import type { UserPublic, PermissionType } from "../types/api";
import { useAuthStore } from "../store/authStore";

export function AdminUsers() {
  const { message } = App.useApp();
  const queryClient = useQueryClient();
  const currentUser = useAuthStore((state: any) => state.user);

  const { data: users, isLoading } = useQuery({
    queryKey: ["admin-users"],
    queryFn: async () => {
      const response = await api.get<{ data: UserPublic[] }>("/users/");
      return response.data.data;
    },
  });

  const updateRoleMutation = useMutation({
    mutationFn: async ({ id, role }: { id: number; role: PermissionType }) => {
      await api.patch(`/users/${id}/role`, { permission: role });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-users"] });
      message.success("Permissão atualizada com sucesso!");
    },
    onError: (error: any) => {
      const detail = error.response?.data?.detail;
      const errorMsg = typeof detail === "string" ? detail : (detail?.msg || "Erro ao atualizar permissão");
      message.error(errorMsg);
    },
  });

  const canDemote = (user: UserPublic) => {
    if (user.permission !== "ADMIN") return true;
    
    // Se não houver update_at, assumimos que é uma promoção nova (deve permitir rebaixar)
    if (!user.update_at) return true;

    const updatedAt = new Date(user.update_at);
    // Verifica se a data é válida
    if (isNaN(updatedAt.getTime())) return true;

    const now = new Date();
    const diffInHours = (now.getTime() - updatedAt.getTime()) / (1000 * 60 * 60);
    
    return diffInHours < 24;
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
      dataIndex: "full_name",
      key: "full_name",
      render: (text: string, record: UserPublic) => (
        <Space>
          <UserOutlined />
          {text} {record.email === currentUser?.email && <Tag color="blue">Você</Tag>}
        </Space>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Cargo",
      dataIndex: "permission",
      key: "permission",
      render: (role: PermissionType) => {
        const colors = {
          ADMIN: "gold",
          USER: "geekblue",
          GUEST: "gray",
        };
        const icons = {
          ADMIN: <CrownOutlined />,
          USER: null,
          GUEST: null,
        };
        return (
          <Tag color={colors[role]} icon={icons[role]}>
            {role}
          </Tag>
        );
      },
    },
    {
      title: "Ações",
      key: "actions",
      render: (_: any, record: UserPublic) => {
        const isSelf = record.email === currentUser?.email;
        if (isSelf) return null;

        const demoteEnabled = canDemote(record);
        
        return (
          <Space>
            {record.permission !== "USER" && (
              <Tooltip title={!demoteEnabled && record.permission === "ADMIN" ? "Administradores antigos não podem ser rebaixados (trava de 24h)" : "Definir como Usuário Padrão"}>
                <Button
                  size="small"
                  disabled={record.permission === "ADMIN" && !demoteEnabled}
                  onClick={() => updateRoleMutation.mutate({ id: record.id, role: "USER" })}
                >
                  Usuário
                </Button>
              </Tooltip>
            )}

            {record.permission !== "ADMIN" && (
              <Button
                type="primary"
                icon={<CrownOutlined />}
                size="small"
                onClick={() => updateRoleMutation.mutate({ id: record.id, role: "ADMIN" })}
              >
                Tornar Admin
              </Button>
            )}

            {record.permission === "USER" && (
                <Button
                  size="small"
                  onClick={() => updateRoleMutation.mutate({ id: record.id, role: "GUEST" })}
                >
                  GUEST
                </Button>
            )}
          </Space>
        );
      },
    },
  ];

  return (
    <div className="max-w-5xl mx-auto p-4">
      <Card title="Gestão de Usuários e Permissões">
        <p className="text-gray-500 mb-6">
          Como administrador, você pode promover usuários para o nível ADMIN. 
          Por segurança, rebaixamentos de administradores só são permitidos dentro de um período de 24 horas após a alteração.
        </p>
        <Table
          columns={columns}
          dataSource={users}
          loading={isLoading}
          rowKey="id"
          pagination={{ pageSize: 10 }}
        />
      </Card>
    </div>
  );
}
