import db from '../db';
import redis from '../redis';
import { User, Product } from '../types';

export const buyProduct = async (sessionId: string, productId: number) => {
  const userId = await redis.get(`session:${sessionId}`);
  if (!userId) throw new Error('Unauthorized');

  const { rows: userRows } = await db.query<User>('SELECT * FROM users WHERE id = $1', [userId]);
  const user = userRows[0];

  const { rows: productRows } = await db.query<Product>('SELECT * FROM products WHERE id = $1', [productId]);

  const product = productRows[0];
  if (!product) throw new Error('Product not found');

  if (user.balance < product.price) throw new Error('Insufficient funds');

  await db.query('UPDATE users SET balance = balance - $1 WHERE id = $2', [product.price, userId]);
  await db.query('INSERT INTO purchases (user_id, product_id, price) VALUES ($1, $2, $3)', [userId, productId, product.price]);
  
  return { newBalance: user.balance - product.price };
};