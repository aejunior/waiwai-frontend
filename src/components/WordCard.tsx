import { Card, Tag } from "antd";
import { WordPublic } from "../types/api";
import { useNavigate } from "react-router-dom";

interface Props {
  word: WordPublic;
}

export default function WordCard({ word }: Props) {
  const navigate = useNavigate();

  return (
    <Card
      key={word.id}
      hoverable
      size="small"
      onClick={() => navigate(`/words/${word.id}`)}
      className="cursor-pointer"
    >
      <h3 className="text-xl font-bold mb-2">{word.word}</h3>
      <p className="text-gray-600 mb-3">
        {word.phonemic ? `/${word.phonemic}/` : "Fonética não informada"}
      </p>
      <div className="flex flex-wrap gap-1">
        {word.categories.map((cat) => (
          <Tag className="mb-2" key={cat.id}>
            {cat.category}
          </Tag>
        ))}
      </div>
    </Card>
  );
}
