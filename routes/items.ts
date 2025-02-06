import express from 'express';
import { getItems } from '../services/items';

const router = express.Router();

router.get('/items', async (req, res) => {
  const items = await getItems();
  res.json(items);
});

export default router;