import React, { useEffect, useState, useContext } from 'react';
import { MessageContext } from '@/contexts_test/contexts/MessageContext';

const Message = () => {
  const { message, color, setMessage, setColor } = useContext(MessageContext);
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    if (message) {
      setShowMessage(true);

      const hideTimer = setTimeout(() => {
        setShowMessage(false);
        const clearTimer = setTimeout(() => {
          setMessage(''); 
          setColor(''); 
        }, 300);

        return () => clearTimeout(clearTimer);
      }, 3000);

      return () => clearTimeout(hideTimer);
    }
  }, [message, setMessage, setColor]);

  return (
    <div
      className={`fixed top-0 w-full flex justify-center items-center z-20 mt-24 transition-opacity duration-300 ease-in-out ${showMessage ? 'opacity-100' : 'opacity-0'}`}
    >
      <div
        className={`max-w-screen-xl w-full p-4 shadow-lg rounded-md text-center transition-transform duration-500 ease-in-out ${showMessage ? 'translate-y-0' : '-translate-y-10'} ${color}`}
      >
        <p className="text-lg font-semibold">
          {message}
        </p>
      </div>
    </div>
  );
};

export default Message;
