import api from "../lib/axios";
import { useState } from "react";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import type { WordPublic } from "../types/api";
import WordSearch from "../components/WordSearch";
import { useDebounce } from "../hooks/useDebounce";
import WordListComponent from "../components/WordList";

export function MyWords() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const debouncedSearch = useDebounce(search, 500);

  const { data, isLoading } = useQuery({
    queryKey: ["my-words", page, pageSize, debouncedSearch],
    queryFn: async () => {
      const response = await api.get<{
        data: WordPublic[];
        total_items: number;
      }>("/me/words", {
        params: {
          q: debouncedSearch || undefined,
          page: page,
          page_size: pageSize,
        },
      });
      return response.data;
    },
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Minhas Palavras</h1>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => navigate("/words/new")}
        >
          Nova
        </Button>
      </div>
      <WordSearch search={search} setSearch={setSearch} />
      <WordListComponent
        words={data?.data || []}
        isLoading={isLoading}
        pagination={{
          page,
          setPage,
          setPageSize,
          pageSize,
          totalItems: data?.total_items,
        }}
      />
    </div>
  );
}
