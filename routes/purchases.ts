import express from 'express';
import { buyProduct } from '../services/purchases';
import { buyProductSchema } from '../schemas/purchases';

const router = express.Router();

router.post('/buy', async (req, res) => {
  const { sessionId, productId } = buyProductSchema.parse(req.body);
  const { newBalance } = await buyProduct(sessionId, productId);
  res.json({ message: 'Purchase successful', newBalance });
});

export default router;