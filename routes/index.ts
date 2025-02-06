import express from 'express';
import authRoutes from './auth';
import itemsRoutes from './items';
import purchasesRoutes from './purchases';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/items', itemsRoutes);
router.use('/purchases', purchasesRoutes);

export default router;