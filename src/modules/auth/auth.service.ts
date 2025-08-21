import { Role } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { AppError } from '../../utils/http.js';
import { signJwt } from '../../utils/jwt.js';
import { createUser, findUserByEmail, findUserById } from './auth.repository.js';
import { config } from '../../config/env.js';

export async function register(input: { name: string; email: string; password: string; role?: Role }) {
  const existing = await findUserByEmail(input.email);
  if (existing) throw new AppError('Email already in use', 409);
  const hash = await bcrypt.hash(input.password, config.bcryptRounds);
  const role: Role = input.role ?? 'CUSTOMER';
  const user = await createUser({ name: input.name, email: input.email, password: hash, role });
  const token = signJwt({ sub: user.id, role: user.role });
  return { token, user: { id: user.id, name: user.name, email: user.email, role: user.role } };
}

export async function login(input: { email: string; password: string }) {
  const user = await findUserByEmail(input.email);
  if (!user) throw new AppError('Invalid credentials', 401);
  const ok = await bcrypt.compare(input.password, user.password);
  if (!ok) throw new AppError('Invalid credentials', 401);
  const token = signJwt({ sub: user.id, role: user.role });
  return { token, user: { id: user.id, name: user.name, email: user.email, role: user.role } };
}

export async function me(userId: string) {
  const u = await findUserById(userId);
  if (!u) throw new AppError('User not found', 404);
  return u;
}
