import { Router } from 'express';
import demandController from '../controllers/DemandController.ts';
import { auth, optionalAuth, adminGuard } from '../middlewares/auth.ts';

const router = Router();

router.get('/', optionalAuth, demandController.findAll);
router.get('/:id', auth, demandController.findById);
router.post('/create', auth, demandController.create);
router.put('/:id', auth, demandController.update);
router.delete('/:id', auth, demandController.delete);
router.patch('/:id/approve', auth, adminGuard, demandController.approve);
router.delete('/:id/disapprove', auth, adminGuard, demandController.disapprove);

export default router;
