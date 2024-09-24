import queryClient from "@/config/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import React, { ReactNode } from "react";
import { AuthContext, useAuthContextValue } from "./contexts/AuthContext";
import { MessageContext, useMessageContextValue } from "./contexts/MessageContext";

const ContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const AuthContextValue = useAuthContextValue();
    const MessageContextValue = useMessageContextValue();

    return (
        <QueryClientProvider client={queryClient}>
            <AuthContext.Provider value={AuthContextValue}>
                <MessageContext.Provider value={MessageContextValue}>
                    {children}
                </MessageContext.Provider>
            </AuthContext.Provider>
        </QueryClientProvider>
    );
};

export default ContextProvider;
