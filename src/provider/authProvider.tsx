import axios from 'axios';
import React, {
    ReactNode,
    useContext,
    useEffect,
    useMemo,
    useState
} from 'react';

import AuthContext from '../contexts/AuthContext';
import { EnumPermission } from '../contexts/types';
import TokenDecode from '../utils/token';




const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [token, setToken] = useState<string>(localStorage.getItem('@App:accessToken') ?? '');
    const [profile, setProfile] = useState<Profile | null>();

    const updateToken = (newToken: string) => {
        setToken(newToken);
    };

    const contextValue = useMemo(() => ({ token, updateToken, profile, setProfile }), [token]);

    useEffect(() => {
        try {
            const decoded = new TokenDecode(token);
            if (!decoded.isAuthenticated) {
                throw new Error("Token expirado.");
            }
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            localStorage.setItem('@App:accessToken', token);
            setProfile({
                name: decoded.getEmail,
                email: decoded.getEmail,
                permission: EnumPermission.USER,
            });

        } catch (e) {
            delete axios.defaults.headers.common['Authorization'];
            localStorage.removeItem('@App:accessToken')
            setProfile(null)
        }

    }, [token]);

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
