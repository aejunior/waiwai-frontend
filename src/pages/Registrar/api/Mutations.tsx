import AxiosClient from "@/services/register";
import { useMutation } from "@tanstack/react-query";

export const useRegisterMutation = () => {
  const axios = AxiosClient();

  const mutation = useMutation({
    mutationFn: async (registerData: {
      username: string;
      email: string;
      password: string;
      confirmationPassword: string;
    }) => await axios.post('/auth/signup', registerData),
    onSuccess: (response) => {
      return response.data;
    },
    onError: (error: any) => {
      if (error.response) {
        switch (error.response.status) {
          case 409:
            console.error('Conflito: Já existe uma conta com esse e-mail.');
            break;
          case 400:
            console.error('Requisição inválida. Verifique os dados fornecidos.');
            break;
          case 500:
            console.error('Erro interno do servidor. Tente novamente mais tarde.');
            break;
          default:
            console.error('Erro ao criar a conta. Por favor, tente novamente.');
        }
      } else {
        console.error('Erro ao criar a conta. Por favor, tente novamente.');
      }
    },
  });

  return mutation;
};
