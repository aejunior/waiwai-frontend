import { Banner, TableDicionario } from "@/pages/Dicionario/components";
import { useInView } from "react-intersection-observer";

const Dicionario: React.FC = () => {
    const { ref } = useInView();

    const data = [
        {
            id: 1,
            word: "A",
            phonemic: null,
            created_at: "2024-05-18T20:20:20.573158Z",
            updated_at: "2024-05-18T20:20:20.573158Z",
            categories: [
                {
                    id: 1,
                    category: "Geral",
                    description: "",
                },
            ],
            meanings: [
                {
                    id: 1,
                    meaning_pt: "seu, sua, teu, tua, você",
                    meaning_ww: "A",
                    comment_pt:
                        "por exemplo: 1ª segunda pessoa awo kru, sua bebida, apici, sua esposa, amoro, você etc.",
                    comment_ww: null,
                    created_at: "2024-05-18T20:20:21.453932Z",
                    updated_at: "2024-05-18T20:20:21.453932Z",
                    word_id: 1,
                    reference_id: 3,
                    user_id: 1,
                },
                {
                    id: 2,
                    meaning_pt: "(a) seu, sua, teu, tua, você",
                    meaning_ww: "a",
                    comment_pt:
                        "por exemplo: 1ª segunda pessoa awo kru, sua bebida, apici, sua esposa, amoro, você, amyamro, vocês, nexamro, eles ou elas, amna, nós.",
                    comment_ww: null,
                    created_at: "2024-05-18T20:20:21.453932Z",
                    updated_at: "2024-05-18T20:20:21.453932Z",
                    word_id: 1,
                    reference_id: 2,
                    user_id: 1,
                },
            ],
            user_id: 1,
        },
        {
            id: 2,
            word: "AACI",
            phonemic: null,
            created_at: "2024-05-18T20:20:20.573158Z",
            updated_at: "2024-05-18T20:20:20.573158Z",
            categories: [
                {
                    id: 1,
                    category: "Geral",
                    description: "",
                },
            ],
            meanings: [
                {
                    id: 3,
                    meaning_pt: "maná, irmã",
                    meaning_ww: "Aaci",
                    comment_pt: null,
                    comment_ww: null,
                    created_at: "2024-05-18T20:20:21.453932Z",
                    updated_at: "2024-05-18T20:20:21.453932Z",
                    word_id: 2,
                    reference_id: 3,
                    user_id: 1,
                },
            ],
            user_id: 1,
        },
    ];

    // const { data, hasNextPage, fetchNextPage } =
    //     useGetWordListInfiniteQuery(16);
    // useEffect(() => {
    //     if (inView && hasNextPage) {
    //         fetchNextPage();
    //     }
    // }, [fetchNextPage, inView, hasNextPage, data]);

    return (
        <>
            <Banner />
            <TableDicionario dataSource={data} />
            <div ref={ref}></div>
        </>
    );
};

export default Dicionario;
