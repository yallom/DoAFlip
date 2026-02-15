import { Router } from 'express';
import userController from '../controllers/users';
import { authMiddleware } from '../middleware/auth';
import { validateRequest } from '../middleware/validation';
import { 
  updateUserSchema, 
  updatePasswordSchema
} from '../validators/users';

const router = Router();

// Todas as rotas de users requerem autenticação
router.use(authMiddleware);

/**
 * @route   GET /api/users/me
 * @desc    Obter dados do utilizador autenticado
 * @access  Private
 */
router.get('/me', userController.getMe);

/**
 * @route   GET /api/users
 * @desc    Listar todos os utilizadores
 * @access  Private (Admin apenas - adicionar middleware de autorização se necessário)
 */
router.get('/', userController.getAll);

/**
 * @route   GET /api/users/:id
 * @desc    Obter utilizador por ID
 * @access  Private
 */
router.get('/:id', userController.getById);

/**
 * @route   PUT /api/users/:id
 * @desc    Atualizar dados do utilizador
 * @access  Private
 */
router.put('/:id', validateRequest(updateUserSchema), userController.update);

/**
 * @route   PATCH /api/users/:id/password
 * @desc    Atualizar password do utilizador
 * @access  Private
 */
router.patch('/:id/password', validateRequest(updatePasswordSchema), userController.updatePassword);

/**
 * @route   DELETE /api/users/:id
 * @desc    Eliminar utilizador
 * @access  Private
 */
router.delete('/:id', userController.delete);

export default router;