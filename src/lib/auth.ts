// src/lib/auth.ts
import { randomBytes } from 'crypto';

/** Generate a random token string (hex) */
export function generateToken(length = 32): string {
  return randomBytes(length).toString('hex');
}

/** Simple session ID generator (placeholder – replace with JWT in prod) */
export function signSessionId(userId: string): string {
  return `${userId}-${generateToken(16)}`;
}
