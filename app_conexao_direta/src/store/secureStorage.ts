import { Platform } from 'react-native';

const AUTH_KEY = 'auth-storage';

interface AuthData {
  token: string;
  user: { id: string; name: string; email: string; role: 'ADMIN' | 'USER' };
}

export async function saveAuth(_data: AuthData): Promise<void> {
  if (Platform.OS === 'web') {
    localStorage.setItem(AUTH_KEY, JSON.stringify(_data));
  }
}

export async function loadAuth(): Promise<AuthData | null> {
  if (Platform.OS !== 'web') return null;
  try {
    const raw = localStorage.getItem(AUTH_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export async function clearAuth(): Promise<void> {
  if (Platform.OS === 'web') {
    localStorage.removeItem(AUTH_KEY);
  }
}
