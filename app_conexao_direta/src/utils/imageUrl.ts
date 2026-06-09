import { getBaseUrl } from '../services/api';

export function getImageUrl(path?: string | null): string | undefined {
  if (!path) return undefined;
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  const base = getBaseUrl();
  if (!base) return undefined;
  return `${base.replace(/\/+$/, '')}${path}`;
}
