import { createContext, useState } from "react";
import { DataType as AuthContextDataType, AuthContextType } from "../../types";

//criacao do contexto
const AuthContext = createContext<AuthContextType>({
    data: {
        subject: null,
        name: null,
        accessToken: null,
        refreshToken: null,
    },
    login: () => {},
    logout: () => {},
});

//funcao com os valores de retorno
const useAuthContextValue = () => {
    const [authData, setAuthData] = useState<AuthContextDataType>({
        subject: null,
        name: null,
        accessToken: null,
        refreshToken: null,
    });

    const login = (data: AuthContextDataType) => {
        setAuthData(data);
    };

    const logout = () => {
        setAuthData({
            subject: null,
            name: null,
            accessToken: null,
            refreshToken: null,
        });
    };

    return { data: authData, login, logout };
};

export { AuthContext, useAuthContextValue };
