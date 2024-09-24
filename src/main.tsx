import ReactDOM from 'react-dom/client';
import AppProvider from './contexts/AppProvider';
import App from '@/App';
import ContextProvider from './contexts_test/ContextProvider';
ReactDOM.createRoot(document.getElementById('root')!).render(
<ContextProvider>


  {/* <AppProvider> */}
    <App />
  {/* </AppProvider> */}
  </ContextProvider>
);
