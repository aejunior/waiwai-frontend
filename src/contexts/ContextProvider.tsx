import { useState } from "react";
import { DataType as AuthContextDataType } from "../types";
import AuthContext from "./AuthContext";

const ContextProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
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

    return (
        <AuthContext.Provider value={{ data: authData, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default ContextProvider;
