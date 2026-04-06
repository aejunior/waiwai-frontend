import { useEffect, useState } from "react";
import { Card, Button } from "antd";
import { useQuery } from "@tanstack/react-query";
import api from "../lib/axios";
import { useDebounce } from "../hooks/useDebounce";
import type { WordPublic } from "../types/api";
import { ALPHABET } from "../constains";
import WordSearch from "../components/WordSearch";
import WordListComponent from "../components/WordList";

export function WordsList() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [selectedLetter, setSelectedLetter] = useState("");
  const debouncedSearch = useDebounce(search, 500);

  const { data, isLoading } = useQuery({
    queryKey: ["words", debouncedSearch, page, pageSize, selectedLetter],
    queryFn: async () => {
      const response = await api.get<{
        data: WordPublic[];
        total_items: number;
      }>("/words/", {
        params: {
          q: debouncedSearch || undefined,
          page,
          page_size: pageSize,
          starts_with: selectedLetter || undefined,
        },
      });
      return response.data;
    },
  });

  const handleLetterClick = (letter: string) => {
    setSelectedLetter(letter);
    setSearch("");
    setPage(1);
  };

  const handleClearLetterFilter = () => {
    setSelectedLetter("");
    setPage(1);
  };

  useEffect(() => {
    if (debouncedSearch) {
      setPage(1);
    }
  }, [debouncedSearch]);

  return (
    <div className="space-y-6">
      <WordSearch search={search} setSearch={setSearch} />

      <Card size="small">
        <div className="flex flex-wrap justify-center gap-2">
          <Button
            type={selectedLetter === "" ? "primary" : "default"}
            onClick={handleClearLetterFilter}
            size="small"
          >
            Todos
          </Button>
          {ALPHABET.map((letter) => (
            <Button
              key={letter}
              type={selectedLetter === letter ? "primary" : "default"}
              onClick={() => handleLetterClick(letter)}
              size="small"
            >
              {letter}
            </Button>
          ))}
        </div>
      </Card>

      <WordListComponent
        words={data?.data || []}
        isLoading={isLoading}
        pagination={{
          page,
          setPage,
          pageSize,
          setPageSize,
          totalItems: data?.total_items,
        }}
      />
    </div>
  );
}
