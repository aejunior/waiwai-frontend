import { useState } from "react";
import AuthContext from "./AuthContext";
import { AuthContextType } from "../types";

const ContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authData, setAuthData] = useState<AuthContextType["data"]>({
    subject: null,
    name: null,
    accessToken: null,
    refreshToken: null,
  });

  const login = (data: AuthContextType["data"]) => {
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
