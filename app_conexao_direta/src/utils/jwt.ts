function base64UrlDecode(str: string): string {
  let output = str.replace(/-/g, '+').replace(/_/g, '/');
  switch (output.length % 4) {
    case 0:
      break;
    case 2:
      output += '==';
      break;
    case 3:
      output += '=';
      break;
    default:
      throw new Error('Invalid base64 string');
  }
  try {
    return decodeURIComponent(
      Array.from(atob(output), (c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join(
        '',
      ),
    );
  } catch {
    return atob(output);
  }
}

export function jwtDecode<T = unknown>(token: string): T {
  if (typeof token !== 'string') {
    throw new Error('Invalid token');
  }
  const parts = token.split('.');
  if (parts.length !== 3) {
    throw new Error('Invalid token format');
  }
  const decoded = base64UrlDecode(parts[1]);
  return JSON.parse(decoded) as T;
}
