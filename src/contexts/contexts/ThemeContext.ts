import { useReadFromLocalStorage } from "@/hooks";
import useSessionStorage from "@/hooks/useSessionStorage";
import { EnumTheme, ThemeContextType } from "@/types/themeTypes";
import { createContext } from "react";
// Criação do contexto
const ThemeContext = createContext<ThemeContextType>({
    themeMode: EnumTheme.LIGHT,
    toggleThemeMode: () => {},
});

// Função com os valores de retorno
const useThemeContextValue = () => {
    const defaultTheme =
        useReadFromLocalStorage<EnumTheme>("theme") ?? EnumTheme.LIGHT;

    const [theme, setTheme] = useSessionStorage<EnumTheme>(
        "theme",
        defaultTheme
    );

    const toggleThemeMode = (theme: EnumTheme) => {
        setTheme(theme);
    };

    return { themeMode: theme, toggleThemeMode: toggleThemeMode };
};

export { ThemeContext, useThemeContextValue };
