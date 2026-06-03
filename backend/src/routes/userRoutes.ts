import { Router } from 'express';
import userController from '../controllers/UserController';
import { auth } from '../middlewares/auth.ts';

const router = Router();

router.get('/', userController.findAll);
router.get('/:email', userController.findByEmail);
router.post('/register', userController.create);
router.post('/login', userController.login);
router.put('/profile', auth, userController.updateProfile);
router.put('/password', auth, userController.changePassword);

export default router;
