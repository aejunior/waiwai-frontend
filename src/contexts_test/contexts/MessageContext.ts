import { createContext, useState } from "react";

// Criando o contexto
const MessageContext = createContext({
    message: "",
    color: "",
    setMessage: () => {},
    setColor: () => {},
});

// Criando valores
const useMessageContextValue = () => {
    const [message, setMessage] = useState("");
    const [color, setColor] = useState("");

    return { message, color, setMessage, setColor };
};

export { MessageContext, useMessageContextValue };
