import { Router } from 'express';
import userRoutes from './userRoutes.ts';

const router = Router();

router.use('/user', userRoutes);

export default router;
