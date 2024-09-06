import { useState } from "react";
import AuthContext from "./AuthContext"; // O arquivo que você criou antes
import { AuthContextType } from "../types";

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authData, setAuthData] = useState<AuthContextType["data"]>({
    subject: null,
    name: null,
    accessToken: null,
    refreshToken: null,
  });

  const login = (data: AuthContextType["data"]) => {
    setAuthData(data);
    // Você pode salvar os tokens no localStorage ou cookie, se necessário
  };

  const logout = () => {
    setAuthData({
      subject: null,
      name: null,
      accessToken: null,
      refreshToken: null,
    });
    // Também remova os tokens armazenados
  };

  return (
    <AuthContext.Provider value={{ data: authData, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
