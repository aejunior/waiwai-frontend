import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";

interface Props {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}

const { Search } = Input;

export default function WordSearch({ search, setSearch }: Props) {
  return (
    <div>
      <Search
        placeholder="Pesquisar palavras..."
        allowClear
        size="large"
        prefix={<SearchOutlined />}
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      />
    </div>
  );
}
