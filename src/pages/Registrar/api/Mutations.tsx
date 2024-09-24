import { AuthContext } from "@/contexts_test/contexts/AuthContext";
import { MessageContext } from "@/contexts_test/contexts/MessageContext";
import AxiosClient from "@/services/AxiosClient";
import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

export const useRegisterMutation = () => {
    const axios = AxiosClient();
    const { setMessage, setColor } = useContext(MessageContext);
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const mutation = useMutation({
        mutationFn: async (registerData: {
            first_name: string;
            last_name: string;
            email: string;
            password: string;
        }) => await axios.post("/auth/signup", registerData),
        onSuccess: (response) => {
            const { access_token, refresh_token } = response.data;

            login({
                subject: null,
                name: null,
                accessToken: access_token,
                refreshToken: refresh_token,
            });

            setMessage("Conta criada com sucesso! Bem-vindo!");
            setColor("bg-success");
            navigate("/");
        },
        onError: (error: any) => {
            if (error.response) {
                switch (error.response.status) {
                    case 409:
                        setMessage(
                            "Conflito: Já existe uma conta com esse e-mail."
                        );
                        setColor("bg-alert");
                        break;
                    case 400:
                        setMessage(
                            "Requisição inválida. Verifique os dados fornecidos."
                        );
                        setColor("bg-alert");
                        break;
                    case 500:
                        setMessage(
                            "Erro interno do servidor. Tente novamente mais tarde."
                        );
                        setColor("bg-alert");
                        break;
                    default:
                        setMessage(
                            "Erro ao criar a conta. Por favor, tente novamente."
                        );
                        setColor("bg-alert");
                }
            } else {
                setMessage(
                    "Erro ao criar a conta. Por favor, tente novamente."
                );
                setColor("bg-alert");
            }
        },
    });

    return mutation;
};
