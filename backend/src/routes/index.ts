import { Router } from 'express';
import userRoutes from './userRoutes.ts';
import demandRoutes from './demandRoutes.ts';

const router = Router();

router.use('/user', userRoutes);
router.use('/demand', demandRoutes);

export default router;
