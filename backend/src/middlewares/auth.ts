import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export function auth(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    res.status(401).json({ message: 'No token provided' });
    return;
  }

  const parts = authHeader.split(' ');

  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    res.status(401).json({ message: 'Invalid token format' });
    return;
  }

  const token = parts[1];
  if (!token) {
    res.status(401).json({ message: 'Invalid token format' });
    return;
  }

  const secret = process.env.JWT_SECRET;
  if (!secret) {
    res.status(500).json({ message: 'Server misconfiguration' });
    return;
  }

  try {
    const decoded = jwt.verify(token, secret) as object;
    req.user = decoded as { id: string; email: string; role: 'ADMIN' | 'USER' };
    next();
  } catch {
    res.status(401).json({ message: 'Invalid or expired token' });
  }
}
