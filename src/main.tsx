import ReactDOM from 'react-dom/client';
import AppProvider from './contexts/AppProvider';
import App from '@/App';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <AppProvider>
    <App />
  </AppProvider>
);
