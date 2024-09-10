import React, { createContext, useContext, useState } from 'react';

// Criando o contexto
const MessageContext = createContext(null);

// Criando o Provider
export const MessageProvider = ({ children }) => {
  const [message, setMessage] = useState('');
  const [color, setColor] = useState('');

  return (
    <MessageContext.Provider value={{ message, color, setMessage, setColor }}>
      {children}
    </MessageContext.Provider>
  );
};

// Custom hook para usar o contexto
export const useMessage = () => {
  return useContext(MessageContext);
};
