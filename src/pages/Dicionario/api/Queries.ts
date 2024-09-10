import AxiosClient from "@/services/axios";
import { WordType } from "@/types/apiResultTypes";
import { useInfiniteQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
// import AxiosClient from '../../../api/axios';
// import AuthContext from '../../../context/AuthContext';
// import { UserMangasInfiniteQueryResponseType, UserMangasResponseType } from '../Home.types';

export const useGetWordListInfiniteQuery = (limit: number) => {
    const axios = AxiosClient();
    // const { data } = useContext(AuthContext);

    return useInfiniteQuery<WordType[], AxiosError>({
        queryKey: ["wordList"],
        queryFn: ({ pageParam = 1 }) =>
            axios
                .get<WordType[]>(`/words/?page=${pageParam}&page_size=${limit}`)
                .then((res) => res.data),
        getNextPageParam: (prevPage, allPages) =>
            prevPage.length > 0 && allPages.length > 0
                ? allPages.length + 1
                : undefined,
        initialPageParam: 1,
        // enabled: !!userInfo?.token,
    });
};
