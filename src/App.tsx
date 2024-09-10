// import AuthProvider from './provider/authProvider';
import { ThemeContext } from "@/contexts";
import { useLocalStorage, useReadFromLocalStorage } from "@/hooks";
import Routes from "@/routes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import { EnumTheme } from "./types/themeTypes";

// Create a client
const queryClient = new QueryClient();

function App() {
    const defaultTheme =
        useReadFromLocalStorage<EnumTheme>("theme") ?? EnumTheme.LIGHT;

    const [theme, setTheme] = useLocalStorage<EnumTheme>("theme", defaultTheme);

    const toggleThemeMode = (theme: EnumTheme) => {
        setTheme(theme);
    };

    return (
        <ThemeContext.Provider
            value={{ themeMode: theme, toggleThemeMode: toggleThemeMode }}
        >
            <QueryClientProvider client={queryClient}>
                <Routes />
            </QueryClientProvider>
            {/*
            <AuthProvider>
            </AuthProvider>
            */}
        </ThemeContext.Provider>
    );
}

export default App;
