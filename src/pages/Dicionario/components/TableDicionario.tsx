import Topic from "@/components/Topic";
import type { TableProps } from "antd";
import { Space, Table, Tag } from "antd";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useGetWordListInfiniteQuery } from "../api/Queries";

interface DataType {
    key: string;
    name: string;
    age: number;
    address: string;
    tags: string[];
}

const columns: TableProps<DataType>["columns"] = [
    {
        title: "Name",
        dataIndex: "name",
        key: "name",
        render: (text) => <a>{text}</a>,
    },
    {
        title: "Age",
        dataIndex: "age",
        key: "age",
    },
    {
        title: "Address",
        dataIndex: "address",
        key: "address",
    },
    {
        title: "Tags",
        key: "tags",
        dataIndex: "tags",
        render: (_, { tags }) => (
            <>
                {tags.map((tag) => {
                    let color = tag.length > 5 ? "geekblue" : "green";
                    if (tag === "loser") {
                        color = "volcano";
                    }
                    return (
                        <Tag color={color} key={tag}>
                            {tag.toUpperCase()}
                        </Tag>
                    );
                })}
            </>
        ),
    },
    {
        title: "Action",
        key: "action",
        render: (_, record) => (
            <Space size="middle">
                <a>Invite {record.name}</a>
                <a>Delete</a>
            </Space>
        ),
    },
];

const data: DataType[] = [
    {
        key: "1",
        name: "John Brown",
        age: 32,
        address: "New York No. 1 Lake Park",
        tags: ["nice", "developer"],
    },
    {
        key: "2",
        name: "Jim Green",
        age: 42,
        address: "London No. 1 Lake Park",
        tags: ["loser"],
    },
    {
        key: "3",
        name: "Joe Black",
        age: 32,
        address: "Sydney No. 1 Lake Park",
        tags: ["cool", "teacher"],
    },
];

const TableDicionario: React.FC = () => {
    const { ref, inView } = useInView();

    const { data, hasNextPage, isPending, fetchNextPage } =
        useGetWordListInfiniteQuery(16);
    useEffect(() => {
        if (inView && hasNextPage) {
            fetchNextPage();
        }
    }, [fetchNextPage, inView, hasNextPage, data]);
    return (
        <Topic
            idTopic="dicionario"
            titleTopic="Está procurando por palavra?"
            bgColor="bg-slate-100"
        >
            <p className="pb-6">
                Seja bem-vindo ao nosso dicionário online! Aqui você encontrará
                uma lista de palavras, frases, expressões e termos usados na
                língua materna Waiwai. Nosso objetivo é preservar a língua
                indígena, incentivando o uso da língua e sua cultura.
            </p>
            <Table className="w-full" dataSource={data} columns={columns} />
        </Topic>
    );
};

export default TableDicionario;
