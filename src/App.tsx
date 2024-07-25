// import { Routes } from './routes';
import AuthProvider from './provider/authProvider';
import ThemeProvider from './provider/themeProvider';
import Routes from './routes';
import './App.css'

function App() {
  return (
    <Routes />
    // <ThemeProvider>
    //   <AuthProvider>
    //   </AuthProvider>
    // </ThemeProvider>
  );
}

export default App;