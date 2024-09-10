import React from 'react';
import { useMessage } from '@/contexts/MessageProvider';

const Message = () => {
  const { message, color } = useMessage();

  if (!message) return null;

  return (
    <div style={{ backgroundColor: color, padding: '10px', borderRadius: '5px' }}>
      <p>{message}</p>
    </div>
  );
};

export default Message;
