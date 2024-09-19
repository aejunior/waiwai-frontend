import React, { ReactNode } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "@/config/queryClient";
import { AuthContext, useAuthContextValue } from "./contexts/AuthContext";

const ContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const AuthContextValue = useAuthContextValue();

    return (
        <QueryClientProvider client={queryClient}>
            <AuthContext.Provider value={AuthContextValue}>
                {children}
            </AuthContext.Provider>
        </QueryClientProvider>
    );
};

export default ContextProvider;
