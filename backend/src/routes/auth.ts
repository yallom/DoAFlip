import { Router } from 'express';
import authController from '../controllers/auth';
import { authMiddleware } from '../middleware/auth';
import { validateRequest } from '../middleware/validation';
import { 
  registerSchema, 
  loginSchema, 
  refreshTokenSchema, 
  verifyTokenSchema 
} from '../validators/auth';

const router = Router();

/**
 * @route   POST /api/auth/register
 * @desc    Registar novo utilizador
 * @access  Public
 */
router.post('/register', validateRequest(registerSchema), authController.register);

/**
 * @route   POST /api/auth/login
 * @desc    Fazer login
 * @access  Public
 */
router.post('/login', validateRequest(loginSchema), authController.login);

/**
 * @route   POST /api/auth/logout
 * @desc    Fazer logout
 * @access  Private
 */
router.post('/logout', authMiddleware, authController.logout);

/**
 * @route   POST /api/auth/refresh
 * @desc    Renovar token
 * @access  Public
 */
router.post('/refresh', validateRequest(refreshTokenSchema), authController.refreshToken);

/**
 * @route   GET /api/auth/verify
 * @desc    Verificar se token é válido
 * @access  Public
 */
router.get('/verify', authController.verifyToken);

export default router;