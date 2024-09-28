import Topic from "@/components/Topic";
import { CategoryType, MeaningType, WordType } from "@/types/apiResultTypes";
import { Table, TableColumnsType } from "antd";
import { Link } from "react-router-dom";

type TableDicionarioProps = {
    dataSource: WordType[];
};

type DataType = {
    key: React.Key;
    id: number;
    word: string;
    categories: CategoryType[];
    meanings: MeaningType[];
};

type ExpandedDataType = {
    key: React.Key;
    meaningPt: string;
    meaningWw: string;
};

const TableDicionario: React.FC<TableDicionarioProps> = ({ dataSource }) => {
    const dataTable: DataType[] = dataSource.map((item) => {
        return {
            key: item.id,
            id: item.id,
            word: item.word,
            categories: item.categories,
            meanings: item.meanings,
        };
    });

    // const expandedRowRender = () => {
    //     const columns: TableColumnsType<ExpandedDataType> = [
    //         { title: "Significado", dataIndex: "meaningPt", key: "meaningPt" },
    //         { title: "Comentário", dataIndex: "meaningWw", key: "meaningWw" },
    //     ]
    // }

    const expandedRowRender = (record: DataType) => {
        const meanings = record.meanings.map((meaning) => {
            return {
                key: "meaning" + record.id + "-" + meaning.id.toString(),
                meaningPt: meaning.meaning_pt,
                meaningWw: meaning.meaning_ww,
            };
        });

        const columns: TableColumnsType<ExpandedDataType> = [
            { title: "Português", dataIndex: "meaningPt", key: "meaningPt" },
            { title: "Wai Wai", dataIndex: "meaningWw", key: "meaningWw" },
        ];

        return (
            <Table columns={columns} dataSource={meanings} pagination={false} />
        );
    };

    const columns: TableColumnsType<DataType> = [
        { title: "Palavra", dataIndex: "word", key: "word" },
        {
            title: "Ação",
            key: "operation",
            align: "center",
            width: 200,
            render: (record: WordType) => {
                return (
                    <Link to={"/dicionario/" + record.id.toString()}>
                        Ver detalhes
                    </Link>
                );
            },
        },
    ];

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
            <Table
                columns={columns}
                className="w-full"
                expandable={{
                    expandedRowRender,
                }}
                dataSource={dataTable}
                size="middle"
            />
        </Topic>
    );
};

export default TableDicionario;
