import { createContext, useState, useEffect } from "react";
import { DataType as AuthContextDataType, AuthContextType } from "../../types";
import TokenDecode from "@/utils/token";
import useSessionStorage from "@/hooks/useSessionStorage";

// Criação do contexto
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

// Função com os valores de retorno
const useAuthContextValue = () => {
  const [token, setToken] = useSessionStorage<string | null>("authToken", "");
  const [refreshToken, setRefreshToken] = useSessionStorage<string | null>("refreshToken", "");

  const [authData, setAuthData] = useState<AuthContextDataType>({
    subject: null,
    name: null,
    accessToken: null,
    refreshToken: null,
  });
  useEffect(() => {
    if (token) {

      try {
        const decodedToken = new TokenDecode(token);

        setAuthData({
          subject: decodedToken.getEmail, 
          name: decodedToken.getName,
          accessToken: token,
          refreshToken: refreshToken, 
        });

      } catch (error) {
        console.error("Erro ao decodificar o token", error);
      }
    } else {
      setAuthData({
        subject: null,
        name: null,
        accessToken: null,
        refreshToken: null,
      });
    }
  }, [token]);

  const login = (data: AuthContextDataType) => {
    setToken(data.accessToken);
    setRefreshToken(data.refreshToken)
  };

  const logout = () => {
    setToken("");
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
