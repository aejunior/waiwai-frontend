import { createContext, useState } from "react";
import { MessageContextType } from "@/types";

// Criando o contexto
const MessageContext = createContext<MessageContextType>({
    message: "",
    color: "",
    setMessage: () => {},
    setColor: () => {},
});

// Função com os valores de retorno
const useMessageContextValue = () => {
    const [message, setMessage] = useState("");
    const [color, setColor] = useState("");

    return { message, color, setMessage, setColor };
};

export { MessageContext, useMessageContextValue };
