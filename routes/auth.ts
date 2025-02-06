import express from 'express';
import { registerUser, loginUser, changePassword } from '../services/auth';
import { registerSchema, loginSchema, changePasswordSchema } from '../schemas/auth';

const router = express.Router();

router.post('/register', async (req, res) => {
  const { username, password } = registerSchema.parse(req.body);
  await registerUser(username, password);
  res.json({ message: 'User registered' });
});

router.post('/login', async (req, res) => {
  const { username, password } = loginSchema.parse(req.body);
  const { sessionId } = await loginUser(username, password);
  res.json({ sessionId });
});

router.post('/change-password', async (req, res) => {
  const { sessionId, oldPassword, newPassword } = changePasswordSchema.parse(req.body);
  await changePassword(sessionId, oldPassword, newPassword);
  res.json({ message: 'Password changed' });
});

export default router;