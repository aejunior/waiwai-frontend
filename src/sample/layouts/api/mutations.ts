import { useMutation } from '@tanstack/react-query';
import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import AxiosClient, { AuthResponseType } from '../../services/axios';
import { queryClient } from '../../api/query-client';
import AuthContext from '../../contexts/AuthContext';
import { LoginDataType } from '../../contexts/types';
import TokenDecode from '../../utils/token';

export const useLoginMutation = () => {
    const authContext = useContext(AuthContext);
    const axios = AxiosClient();
    const params = useParams();

    const mutation = useMutation({
        mutationFn: async (loginData: LoginDataType) =>
            await axios.post<AuthResponseType>('/auth/signin', loginData),
        onSuccess: (response: any) => {
            const decodedToken = new TokenDecode(response.data.accessToken);
            authContext.login({
                subject: decodedToken.getEmail,
                name: decodedToken.getName,
                accessToken: response.data.accessToken,
                refreshToken: response.data.refreshToken,
            });
            // queryClient.invalidateQueries({ queryKey: ['homeData'] });
            // queryClient.invalidateQueries({ queryKey: ['mangaData'] });
            // queryClient.invalidateQueries({ queryKey: ['usersFollowing'] });
            // params?.mangaId &&
            //     queryClient.invalidateQueries({
            //         queryKey: ['sourceData', params.mangaId],
            //     });
            // queryClient.invalidateQueries({ queryKey: ['libraryData'] });
        },
    });

    return mutation;
};

export const useRegisterMutation = () => {
    const axios = AxiosClient();
    const params = useParams();

    const mutation = useMutation({
        mutationFn: async (registerData: {
            username: string;
            email: string;
            password: string;
            confirmationPassword: string;
        }) => await axios.post<AuthResponseType>('/api/auth/register', registerData),
        onSuccess: (response: any) => {
            queryClient.invalidateQueries({ queryKey: ['homeData'] });
            queryClient.invalidateQueries({ queryKey: ['mangaData'] });
            queryClient.invalidateQueries({ queryKey: ['usersFollowing'] });
            params?.mangaId &&
                queryClient.invalidateQueries({
                    queryKey: ['sourceData', params.mangaId],
                });
            queryClient.invalidateQueries({ queryKey: ['libraryData'] });

            return response;
        },
        onError: (error: any) => error,
    });

    return mutation;
};