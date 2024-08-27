import { createContext } from "react";
import { AuthContextType } from "../types";

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

export default AuthContext;
