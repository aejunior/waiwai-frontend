import { useState } from "react";
import { Table, Tag, Button, Typography, Card, Space } from "antd";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { EyeOutlined, ClockCircleOutlined, UserOutlined } from "@ant-design/icons";
import api from "../lib/axios";
import type { WordPublic, WordStatus } from "../types/api";
import dayjs from "dayjs";

const { Title, Text } = Typography;

export function AdminReviewQueue() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const { data, isLoading } = useQuery({
    queryKey: ["admin", "review-queue", page, pageSize],
    queryFn: async () => {
      const response = await api.get<{
        data: WordPublic[];
        total_items: number;
      }>("/words/", {
        params: {
          status: "PENDING" as WordStatus,
          page,
          page_size: pageSize,
        },
      });
      return response.data;
    },
  });

  const columns = [
    {
      title: "Autor",
      dataIndex: ["user", "full_name"],
      key: "author",
      render: (text: string) => (
        <Space>
          <UserOutlined />
          <Text>{text}</Text>
        </Space>
      ),
    },
    {
      title: "Palavra",
      dataIndex: "word",
      key: "word",
      render: (text: string, record: WordPublic) => (
        <Space direction="vertical" size={0}>
          <Text strong>{text}</Text>
          <Text type="secondary" size="small">{record.phonemic || "-"}</Text>
        </Space>
      ),
    },
    {
        title: "Categorias",
        dataIndex: "categories",
        key: "categories",
        render: (categories: any[]) => (
          <div className="flex flex-wrap gap-1">
            {categories.map((cat) => (
              <Tag key={cat.id} color="blue">{cat.category}</Tag>
            ))}
          </div>
        ),
      },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: () => (
        <Tag icon={<ClockCircleOutlined />} color="orange">
          Pendente
        </Tag>
      ),
    },
    {
      title: "Criada em",
      dataIndex: "created_at",
      key: "created_at",
      render: (date: string) => dayjs(date).format("DD/MM/YYYY HH:mm"),
    },
    {
      title: "Ações",
      key: "actions",
      render: (_: any, record: WordPublic) => (
        <Button
          type="primary"
          icon={<EyeOutlined />}
          onClick={() => navigate(`/words/${record.id}`)}
        >
          Revisar
        </Button>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <Title level={2}>Fila de Revisão</Title>
          <Text type="secondary">
            Visualize e aprove palavras submetidas pelos usuários.
          </Text>
        </div>
      </div>

      <Card>
        <Table
          columns={columns}
          dataSource={data?.data || []}
          loading={isLoading}
          rowKey="id"
          pagination={{
            current: page,
            pageSize: pageSize,
            total: data?.total_items || 0,
            onChange: (p: number, s: number) => {
              setPage(p);
              setPageSize(s);
            },
            showSizeChanger: true,
          }}
        />
      </Card>
    </div>
  );
}
