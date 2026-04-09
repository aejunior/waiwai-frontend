import { Pagination, Spin, Typography } from "antd";
import { WordPublic } from "../types/api";
import WordCard from "./WordCard";

interface Props {
  words: WordPublic[];
  isLoading: boolean;
  pagination?: {
    page?: number;
    pageSize?: number;
    setPage?: (page: number) => void;
    setPageSize?: (pageSize: number) => void;
    totalItems?: number;
  };
}

const { Text } = Typography;

export default function WordListComponent({
  words,
  isLoading,
  pagination,
}: Props) {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12 h-[55vh]">
        <Spin size="large" />
      </div>
    );
  }

  if (!words || words.length === 0) {
    return (
      <div className="flex items-center justify-center h-[55vh] ">
        <Text type="secondary">Nenhuma palavra encontrada</Text>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
        {words.map((word, index) => (
          <WordCard key={index + Number(word.id)} word={word} />
        ))}
      </div>
      {pagination && (
        <div className="flex justify-center">
          <Pagination
            size="small"
            current={pagination.page}
            pageSize={pagination.pageSize}
            total={pagination.totalItems}
            onChange={(newPage, newPageSize) => {
              pagination.setPage?.(newPage);
              pagination.setPageSize?.(newPageSize);
            }}
            showSizeChanger
            showTotal={(total) => `Total ${total} palavras`}
          />
        </div>
      )}
    </div>
  );
}
