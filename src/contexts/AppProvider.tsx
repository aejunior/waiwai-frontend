import { ReactNode } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import queryClient from '@/queryClient';
import ContextProvider from './ContextProvider';
import { MessageProvider } from './MessageProvider';

interface Props {
  children: ReactNode;
}

const AppProvider = ({ children }: Props) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ContextProvider>
        <MessageProvider>
          {children}
        </MessageProvider>
      </ContextProvider>
    </QueryClientProvider>
  );
};

export default AppProvider;
