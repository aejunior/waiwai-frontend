// import { useContext } from "react";
import AxiosClient from "@/services/axios";
// import { useMutation } from "@tanstack/react-query";


 export const RegisterMutation = async (registerData: {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
}) => {
    const axios = AxiosClient();
    try {
        const response = await axios.post('/api/auth/register', registerData);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Erro ao registrar');
    }
};

