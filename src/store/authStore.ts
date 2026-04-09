import { jwtDecode } from "jwt-decode";
import { create } from "zustand";
import { User } from "../types/user";

interface DecodedToken {
  exp: number;
  iat: number;
  data: User;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isInitialized: boolean;
  login: (token: string) => void;
  logout: () => void;
}

const decodeAndSetUser = (token: string): User | null => {
  try {
    const decoded = jwtDecode<DecodedToken>(token);

    if (decoded.exp * 1000 < Date.now()) {
      console.warn("Token expirado.");
      return null;
    }

    return {
      email: decoded.data.email,
      name: decoded.data.name,
      permission: decoded.data.permission,
    };
  } catch (error) {
    console.error("Falha ao decodificar token:", error);
    return null;
  }
};

const getInitialState = () => {
  const token = localStorage.getItem("access_token");
  if (token) {
    const user = decodeAndSetUser(token);
    if (user) {
      return { token, isAuthenticated: true, user, isInitialized: true };
    }
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
  }
  return { token: null, isAuthenticated: false, user: null, isInitialized: true };
};

export const useAuthStore = create<AuthState>((set, get) => ({
  ...getInitialState(),
  login: (token: string) => {
    const user = decodeAndSetUser(token);
    if (user) {
      localStorage.setItem("access_token", token);
      set({ user, token, isAuthenticated: true });
    } else {
      get().logout();
    }
  },
  logout: () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    set({ user: null, token: null, isAuthenticated: false });
  },
}));
