import { Router } from 'express';
import mealPlanController from '../controllers/mealPlan';
import { authMiddleware } from '../middleware/auth';
import { validateRequest } from '../middleware/validation';
import { 
  createMealPlanSchema,
  updateMealPlanSchema
} from '../validators/mealPlan';

const router = Router();

// Todas as rotas de users requerem autenticação
//router.use(authMiddleware);

/**
 * @route   GET /api/mealplan
 * @desc    Obter dados do plano alimentar autenticado
 * @access  Private
 */
router.get('/', mealPlanController.getAll);

/**
 * @route   GET /api/users/:id
 * @desc    Obter utilizador por ID
 * @access  Private
 */
router.get('/:id', mealPlanController.getById);

/**
 * @route   GET /api/mealplan/userid/:id
 * @desc    Obter plano alimentar por userID
 * @access  Private
 */
router.get('/userid/:id', mealPlanController.getByUserId);
/**
 * @route   POST /api/mealplan
 * @desc    Craiar novo plano alimentar
 * @access  Private
 */
router.post('/', validateRequest(createMealPlanSchema), mealPlanController.create);

/**
 * @route   PUT /api/mealplan/:id
 * @desc    Atualizar plano alimentar
 * @access  Private
 */
router.put('/:id', validateRequest(updateMealPlanSchema), mealPlanController.update);

/**
 * @route   DELETE /api/mealplan/:id
 * @desc    Eliminar plano alimentar
 * @access  Private
 */
router.delete('/:id', mealPlanController.delete);

export default router;