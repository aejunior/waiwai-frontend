// import AuthProvider from './provider/authProvider';
import { ThemeContext } from "@/contexts";
import { useReadFromLocalStorage, useLocalStorage } from "@/hooks";
import { EnumTheme } from "./types/themeTypes";
import Routes from "@/routes";
import "./App.css";

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
            <Routes />
            {/*
            <AuthProvider>
            </AuthProvider>
            */}
        </ThemeContext.Provider>
    );
}

export default App;
