import { createContext } from "react";
import { EnumTheme, ThemeContextType } from "@/types/themeTypes";

const ThemeContext = createContext<ThemeContextType>({
    themeMode: EnumTheme.LIGHT,
    toggleThemeMode: () => {},
});

export default ThemeContext;
