import AxiosClient from "@/services/register";
import { useMutation } from "@tanstack/react-query";

export const useLoginMutation = () => {
  const axios = AxiosClient();

  return useMutation({
    mutationFn: async (loginData: {
      email: string;
      password: string;
    }) => await axios.post('/auth/signin', loginData),
    onSuccess: (response) => {
      return response.data;
    },
    onError: (error: any) => {
      if (error.response) {
        switch (error.response.status) {
          case 401:
            console.error('Credenciais inválidas. Verifique seu e-mail e senha.');
            break;
          case 400:
            console.error('Requisição inválida. Verifique os dados fornecidos.');
            break;
          case 500:
            console.error('Erro interno do servidor. Tente novamente mais tarde.');
            break;
          default:
            console.error('Erro ao fazer login. Por favor, tente novamente.');
        }
      } else {
        console.error('Erro ao fazer login. Por favor, tente novamente.');
      }
    },
  });
};
