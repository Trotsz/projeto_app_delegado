import { Platform } from 'react-native';

const AUTH_KEY = 'auth-storage';

interface AuthData {
  token: string;
  user: { id: string; name: string; email: string; role: 'ADMIN' | 'USER' };
}

function setCookie(data: AuthData): void {
  const value = encodeURIComponent(JSON.stringify(data));
  document.cookie = `${AUTH_KEY}=${value}; path=/; SameSite=Lax; max-age=345600`; // 4 days
}

function getCookie(): AuthData | null {
  const match = document.cookie.match(`(?:^|; )${AUTH_KEY}=([^;]*)`);
  if (!match) return null;
  try {
    return JSON.parse(decodeURIComponent(match[1]));
  } catch {
    return null;
  }
}

function removeCookie(): void {
  document.cookie = `${AUTH_KEY}=; path=/; SameSite=Lax; max-age=0`;
}

export async function saveAuth(data: AuthData): Promise<void> {
  if (Platform.OS === 'web') {
    setCookie(data);
  }
}

export async function loadAuth(): Promise<AuthData | null> {
  if (Platform.OS !== 'web') return null;
  return getCookie();
}

export async function clearAuth(): Promise<void> {
  if (Platform.OS === 'web') {
    removeCookie();
  }
}
