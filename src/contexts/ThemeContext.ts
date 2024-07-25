import { createContext } from "react";
import { EnumTheme, ThemeContextType } from "./types";

const ThemeContext = createContext<ThemeContextType>({
    themeMode: EnumTheme.LIGHT,
    toggleThemeMode: () => { },
});

export default ThemeContext;