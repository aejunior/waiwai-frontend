import React, {
    ReactNode,
    useContext,
    useEffect,
    useMemo,
    useState
} from 'react';

import { EnumTheme } from '../contexts/types';
import ThemeContext from '../contexts/ThemeContext';


const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [themeMode, setThemeMode] = useState<EnumTheme>(EnumTheme[localStorage.getItem('@App:theme') as keyof typeof EnumTheme ?? 'LIGHT']);

    const toggleThemeMode = (newToken: EnumTheme) => {
        setThemeMode(newToken);
    };

    const contextValue = useMemo(() => ({ themeMode, toggleThemeMode }), [themeMode]);

    useEffect(() => {
        if (themeMode) {
            localStorage.setItem('@App:theme', themeMode);
        }
        else {
            localStorage.removeItem('@App:theme')
        }
    }, [themeMode]);

    return (
        <ThemeContext.Provider value={contextValue}>
            {children}
        </ThemeContext.Provider>
    );
}

export const useTheme = () => useContext(ThemeContext);

export default ThemeProvider;