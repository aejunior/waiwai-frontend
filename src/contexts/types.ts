export enum EnumTheme {
    DARK = 'DARK',
    LIGHT = 'LIGHT',
}

export enum EnumPermission {
    GUEST = 'GUEST',
    USER = 'USER',
    ADMIN = 'ADMIN'
}

export type Profile = {
    name: string;
    email: string;
    permission: EnumPermission;
}

export type LoginDataType = {
    email: string;
    password: string;
}


export type ThemeContextType = {
    themeMode: EnumTheme;
    toggleThemeMode: (themeChoosed: EnumTheme) => void;
}

export type DataType = {
    subject: string | null;
    name: string | null;
    accessToken: string | null;
    refreshToken: string | null;
}

export type AuthContextType = {
    data: DataType;
    login: (loginData: DataType) => void;
    logout: () => void;
}

export type LoadingContextType = {
    isLoading: boolean;
    changeLoadingState: () => void;
}
