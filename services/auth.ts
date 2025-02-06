import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import db from '../db';
import redis from '../redis';
import { User } from '../types';

export const registerUser = async (username: string, password: string) => {
  const hash = await bcrypt.hash(password, 10);
  await db.query('INSERT INTO users (username, password, balance) VALUES ($1, $2, 100.0)', [username, hash]);
};

export const loginUser = async (username: string, password: string) => {
  const { rows } = await db.query<User>('SELECT * FROM users WHERE username = $1', [username]);

  const user = rows[0];
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new Error('Invalid credentials');
  }

  const sessionId = uuidv4();
  await redis.set(`session:${sessionId}`, user.id, 'EX', 3600);

  return { sessionId };
};

export const changePassword = async (sessionId: string, oldPassword: string, newPassword: string) => {
  const userId = await redis.get(`session:${sessionId}`);
  if (!userId) throw new Error('Unauthorized');

  const { rows } = await db.query<User>('SELECT * FROM users WHERE id = $1', [userId]);
  const user = rows[0];
  if (!user || !(await bcrypt.compare(oldPassword, user.password))) {
    throw new Error('Invalid credentials');
  }

  const newHash = await bcrypt.hash(newPassword, 10);
  await db.query('UPDATE users SET password = $1 WHERE id = $2', [newHash, userId]);
};