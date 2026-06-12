import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { authApi, tokenStorage, User } from '../services/Api';

// ─── Tipos ───────────────────────────────────────────────────────────────────

export interface RegisterExtra {
  dataNasc?: string;
  pesoKg?: number;
  alturaCm?: number;
  comorbidades?: {
    enxaqueca: boolean;
    alergias: boolean;
    hipertensao: boolean;
    diabetes: boolean;
  };
}

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

interface AuthContextData extends AuthState {
  login: (username: string, password: string) => Promise<void>;
  register: (name: string, username: string, password: string, extra?: RegisterExtra) => Promise<void>;
  logout: () => Promise<void>;
}

// ─── Context ─────────────────────────────────────────────────────────────────

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    token: null,
    isLoading: true,
    isAuthenticated: false,
  });

  // Restaura sessão ao abrir o app
  useEffect(() => {
    async function restoreSession() {
      try {
        const [token, user] = await Promise.all([
          tokenStorage.get(),
          tokenStorage.getUser(),
        ]);
        if (token && user) {
          setState({ user, token, isLoading: false, isAuthenticated: true });
        } else {
          setState(s => ({ ...s, isLoading: false }));
        }
      } catch {
        setState(s => ({ ...s, isLoading: false }));
      }
    }
    restoreSession();
  }, []);

  const login = useCallback(async (username: string, password: string) => {
    const res = await authApi.login(username, password);
    setState({ user: res.user, token: res.accessToken, isLoading: false, isAuthenticated: true });
  }, []);

  const register = useCallback(
    async (name: string, username: string, password: string, extra?: RegisterExtra) => {
      const res = await authApi.register(name, username, password, extra);
      setState({ user: res.user, token: res.accessToken, isLoading: false, isAuthenticated: true });
    },
    [],
  );

  const logout = useCallback(async () => {
    await authApi.logout();
    setState({ user: null, token: null, isLoading: false, isAuthenticated: false });
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth deve ser usado dentro de <AuthProvider>');
  return ctx;
}
