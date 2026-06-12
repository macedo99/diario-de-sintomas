import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_URL = 'http://10.0.2.2:3000/api/v1';

const TOKEN_KEY = '@health:token';
const USER_KEY  = '@health:user';

export interface User {
  id: string;
  name: string;
  username: string;
  dataNasc?: string;
  pesoKg?: number;
  alturaCm?: number;
  comorbidades?: {
    enxaqueca: boolean;
    alergias: boolean;
    hipertensao: boolean;
    diabetes: boolean;
  };
  createdAt: string;
}

export interface AuthResponse {
  user: User;
  accessToken: string;
}

export interface ApiError {
  message: string;
  statusCode: number;
}

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

export const tokenStorage = {
  async save(token: string, user: User) {
    await AsyncStorage.multiSet([
      [TOKEN_KEY, token],
      [USER_KEY, JSON.stringify(user)],
    ]);
  },
  async get(): Promise<string | null> {
    return AsyncStorage.getItem(TOKEN_KEY);
  },
  async getUser(): Promise<User | null> {
    const raw = await AsyncStorage.getItem(USER_KEY);
    return raw ? JSON.parse(raw) : null;
  },
  async clear() {
    await AsyncStorage.multiRemove([TOKEN_KEY, USER_KEY]);
  },
};


async function http<T>(
  method: string,
  path: string,
  body?: object,
  requiresAuth = true,
): Promise<T> {
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };

  if (requiresAuth) {
    const token = await tokenStorage.get();
    if (token) headers['Authorization'] = `Bearer ${token}`;
  }

  try {
    const response = await fetch(`${BASE_URL}${path}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    });

    const text = await response.text();
    let data: any = null;
    try {
      data = text ? JSON.parse(text) : null;
    } catch {
      data = text;
    }

    if (!response.ok) {
      const msg = Array.isArray(data?.message) ? data.message[0] : data?.message ?? 'Erro desconhecido';
      throw { message: msg, statusCode: response.status } as ApiError;
    }

    return data as T;
  } catch (err: any) {
    if (err && typeof err === 'object' && 'statusCode' in err) throw err;
    const message = err instanceof Error ? err.message : String(err ?? 'Falha de rede');
    throw { message: `Falha de rede: ${message}`, statusCode: 0 } as ApiError;
  }
}

export const authApi = {
  async register(
    name: string,
    username: string,
    password: string,
    extra?: RegisterExtra,
  ): Promise<AuthResponse> {
    const res = await http<AuthResponse>(
      'POST', '/auth/register',
      { name, username, password, ...extra },
      false,
    );
    await tokenStorage.save(res.accessToken, res.user);
    return res;
  },

  async login(username: string, password: string): Promise<AuthResponse> {
    const res = await http<AuthResponse>(
      'POST', '/auth/login',
      { username, password },
      false,
    );
    await tokenStorage.save(res.accessToken, res.user);
    return res;
  },

  async logout() {
    await tokenStorage.clear();
  },

  async getMe(): Promise<User> {
    const res = await http<{ user: User }>('GET', '/auth/me');
    return res.user;
  },
};

export type HealthType =
  | 'weight_height'
  | 'blood_pressure'
  | 'blood_glucose'
  | 'heart_rate'
  | 'sleep'
  | 'medication'
  | 'physical_activity';

export const healthApi = {
  create: (type: HealthType, data: object, recordedAt?: string) =>
    http('POST', '/health', { type, data, recordedAt }),
  list: (type?: HealthType) =>
    http<any[]>('GET', `/health${type ? `?type=${type}` : ''}`),
  summary: () =>
    http<any>('GET', '/health/summary'),
  getById: (id: string) =>
    http<any>('GET', `/health/${id}`),
  update: (id: string, data: object, recordedAt?: string) =>
    http('PUT', `/health/${id}`, { data, recordedAt }),
  remove: (id: string) =>
    http('DELETE', `/health/${id}`),
};
