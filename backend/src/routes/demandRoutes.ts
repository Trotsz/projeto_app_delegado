import { Router } from 'express';
import demandController from '../controllers/DemandController.ts';
import { auth } from '../middlewares/auth.ts';

const router = Router();

router.get('/', demandController.findAll);
router.get('/:id', auth, demandController.findById);
router.post('/create', auth, demandController.create);
router.put('/:id', auth, demandController.update);
router.delete('/:id', auth, demandController.delete);

export default router;
