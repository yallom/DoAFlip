import { Router } from 'express';
import foodReplacementController from '../controllers/foodReplacement';
import { validateRequest } from '../middleware/validation';
import { 
  createFoodReplacementSchema,
  updateFoodReplacementSchema
} from '../validators/foodReplacement';

const router = Router();

/**
 * @route   GET /api/foodreplacement
 * @desc    Listar todas as substituições de alimentos
 * @access  Private
 */
router.get('/', foodReplacementController.getAll);

/**
 * @route   GET /api/foodreplacement/:id
 * @desc    Obter substituição por ID
 * @access  Private
 */
router.get('/:id', foodReplacementController.getById);

/**
 * @route   GET /api/foodreplacement/ingredient/:recipeIngredientId
 * @desc    Obter substituições por Recipe Ingredient ID
 * @access  Private
 */
router.get('/ingredient/:recipeIngredientId', foodReplacementController.getByRecipeIngredientId);

/**
 * @route   GET /api/foodreplacement/original/:originalFoodId
 * @desc    Obter substituições por Alimento Original
 * @access  Private
 */
router.get('/original/:originalFoodId', foodReplacementController.getByOriginalFoodId);

/**
 * @route   GET /api/foodreplacement/replacement/:replacementFoodId
 * @desc    Obter substituições por Alimento de Substituição
 * @access  Private
 */
router.get('/replacement/:replacementFoodId', foodReplacementController.getByReplacementFoodId);

/**
 * @route   POST /api/foodreplacement
 * @desc    Criar nova substituição de alimento
 * @access  Private
 */
router.post('/', validateRequest(createFoodReplacementSchema), foodReplacementController.create);

/**
 * @route   PUT /api/foodreplacement/:id
 * @desc    Atualizar substituição de alimento
 * @access  Private
 */
router.put('/:id', validateRequest(updateFoodReplacementSchema), foodReplacementController.update);

/**
 * @route   DELETE /api/foodreplacement/:id
 * @desc    Eliminar substituição de alimento
 * @access  Private
 */
router.delete('/:id', foodReplacementController.delete);

export default router;
