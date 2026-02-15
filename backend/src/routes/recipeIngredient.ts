import { Router } from 'express';
import recipeIngredientController from '../controllers/recipeIngredient';
import { validateRequest } from '../middleware/validation';
import { 
  createRecipeIngredientSchema,
  updateRecipeIngredientSchema
} from '../validators/recipeIngredient';

const router = Router();

/**
 * @route   GET /api/recipeingredient
 * @desc    Listar todos os ingredientes de receitas
 * @access  Private
 */
router.get('/', recipeIngredientController.getAll);

/**
 * @route   GET /api/recipeingredient/:id
 * @desc    Obter ingrediente de receita por ID
 * @access  Private
 */
router.get('/:id', recipeIngredientController.getById);

/**
 * @route   GET /api/recipeingredient/recipe/:recipeId
 * @desc    Obter ingredientes por Recipe ID
 * @access  Private
 */
router.get('/recipe/:recipeId', recipeIngredientController.getByRecipeId);

/**
 * @route   GET /api/recipeingredient/food/:foodId
 * @desc    Obter ingredientes por Food ID
 * @access  Private
 */
router.get('/food/:foodId', recipeIngredientController.getByFoodId);

/**
 * @route   POST /api/recipeingredient
 * @desc    Criar novo ingrediente de receita
 * @access  Private
 */
router.post('/', validateRequest(createRecipeIngredientSchema), recipeIngredientController.create);

/**
 * @route   PUT /api/recipeingredient/:id
 * @desc    Atualizar ingrediente de receita
 * @access  Private
 */
router.put('/:id', validateRequest(updateRecipeIngredientSchema), recipeIngredientController.update);

/**
 * @route   DELETE /api/recipeingredient/:id
 * @desc    Eliminar ingrediente de receita
 * @access  Private
 */
router.delete('/:id', recipeIngredientController.delete);

export default router;
