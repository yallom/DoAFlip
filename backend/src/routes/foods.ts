import { Router } from 'express';
import foodController from '../controllers/foods';
//import { authMiddleware } from '../middleware/auth';
import { validateRequest } from '../middleware/validation';
import { updateFoodSchema } from '../validators/foods';

const router = Router();

// Todas as rotas de foods requerem autenticação
//router.use(authMiddleware);

/**
 * @route   GET /api/foods/me
 * @desc    Obter dados do utilizador autenticado
 * @access  Private
 */
router.get('/me', foodController.getMe);

/**
 * @route   GET /api/foods
 * @desc    Listar todos os utilizadores
 * @access  Private (Admin apenas - adicionar middleware de autorização se necessário)
 */
router.get('/', foodController.getAll);

/**
 * @route   GET /api/foods/:id
 * @desc    Obter utilizador por ID
 * @access  Private
 */
router.get('/:id', foodController.getById);

/**
 * @route   PUT /api/foods/:id
 * @desc    Atualizar dados do utilizador
 * @access  Private
 */
router.put('/:id', validateRequest(updateFoodSchema), foodController.update);

/**
 * @route   DELETE /api/foods/:id
 * @desc    Eliminar utilizador
 * @access  Private
 */
router.delete('/:id', foodController.delete);

export default router;