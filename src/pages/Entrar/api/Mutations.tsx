import AxiosClient from "@/services/AxiosClient";
import { useMutation } from "@tanstack/react-query";
import { MessageContext } from "@/contexts_test/contexts/MessageContext";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "@/contexts_test/contexts/AuthContext";

export const useLoginMutation = () => {
  const axios = AxiosClient();
  const { setMessage, setColor } = useContext(MessageContext);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: async (loginData: {
      email: string;
      password: string;
    }) => await axios.post('/auth/signin', loginData),
    onSuccess: (response) => {
      const { access_token, refresh_token} = response.data;

      login({
        subject: null, 
        name: null,   
        accessToken: access_token,
        refreshToken: refresh_token,
      });

      setMessage('Login realizado com sucesso!');
      setColor('bg-success');
      navigate('/');
    },
    onError: (error: any) => {
      if (error.response) {
        switch (error.response.status) {
          case 401:
            setMessage('Credenciais inválidas. Verifique seu e-mail e senha.');
            setColor('bg-alert');
            break;
          case 400:
            setMessage('Requisição inválida. Verifique os dados fornecidos.');
            setColor('bg-alert');
            break;
          case 500:
            setMessage('Erro interno do servidor. Tente novamente mais tarde.');
            setColor('bg-alert');
            break;
          default:
            setMessage('Erro ao fazer login. Por favor, tente novamente.');
            setColor('bg-alert');
        }
      } else {
        setMessage('Erro ao fazer login. Por favor, tente novamente.');
        setColor('bg-alert');
      }
    },
  });
  return mutation;
};
