import { Router } from 'express';
import userController from '../controllers/UserController';

const router = Router();

router.get('/', userController.findAll);
router.get('/:email', userController.findByEmail);
router.post('/register', userController.create);
router.post('/login', userController.login);

export default router;
