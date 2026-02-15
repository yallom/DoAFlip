import { Router } from 'express';
import recipeController from '../controllers/recipe';
import { authMiddleware } from '../middleware/auth';
import { validateRequest } from '../middleware/validation';
import { 
  createRecipeSchema,
  updateRecipeSchema
} from '../validators/recipe';

const router = Router();

// Todas as rotas de receitas requerem autenticação
// router.use(authMiddleware);

/**
 * @route   GET /api/recipe
 * @desc    Listar todas as receitas
 * @access  Private
 */
router.get('/', recipeController.getAll);

/**
 * @route   GET /api/recipe/:id
 * @desc    Obter receita por ID
 * @access  Private
 */
router.get('/:id', recipeController.getById);

/**
 * @route   GET /api/recipe/meal/:mealId
 * @desc    Obter receitas por Meal ID
 * @access  Private
 */
router.get('/meal/:mealId', recipeController.getByMealId);

/**
 * @route   POST /api/recipe
 * @desc    Criar nova receita
 * @access  Private
 */
router.post('/', validateRequest(createRecipeSchema), recipeController.create);

/**
 * @route   PUT /api/recipe/:id
 * @desc    Atualizar receita
 * @access  Private
 */
router.put('/:id', validateRequest(updateRecipeSchema), recipeController.update);

/**
 * @route   DELETE /api/recipe/:id
 * @desc    Eliminar receita
 * @access  Private
 */
router.delete('/:id', recipeController.delete);

export default router;
