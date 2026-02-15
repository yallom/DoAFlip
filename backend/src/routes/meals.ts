import { Router } from 'express';
import mealController from '../controllers/meals';
//import { authMiddleware } from '../middleware/auth';
import { validateRequest } from '../middleware/validation';
import { updateMealSchema } from '../validators/meals';
import { createMealSchema } from '../validators/meals';

const router = Router();

// Todas as rotas de foods requerem autenticação
//router.use(authMiddleware);

/**
 * @route   GET /api/foods
 * @desc    Listar todos os utilizadores
 * @access  Private (Admin apenas - adicionar middleware de autorização se necessário)
 */
router.get('/', mealController.getAll);

/**
 * @route   GET /api/foods/:id
 * @desc    Obter utilizador por ID
 * @access  Private
 */
router.get('/:id', mealController.getById);

/**
 * @route   POST /api/meals
 * @desc    Craiar novo plano alimentar
 * @access  Private
 */
router.post('/', validateRequest(createMealSchema), mealController.create);

/**
 * @route   PUT /api/foods/:id
 * @desc    Atualizar dados do utilizador
 * @access  Private
 */
router.put('/:id', validateRequest(updateMealSchema), mealController.update);

/**
 * @route   DELETE /api/foods/:id
 * @desc    Eliminar utilizador
 * @access  Private
 */
router.delete('/:id', mealController.delete);

export default router;