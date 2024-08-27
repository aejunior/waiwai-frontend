export enum EnumTheme {
    DARK = "DARK",
    LIGHT = "LIGHT",
}

export type ThemeContextType = {
    themeMode: EnumTheme;
    toggleThemeMode: (themeChoosed: EnumTheme) => void;
};
