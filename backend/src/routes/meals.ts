import { Router } from 'express';
import mealController from '../controllers/meals';
import { validateRequest } from '../middleware/validation';
import { updateMealSchema, createMealSchema } from '../validators/meals';

const router = Router();

/**
 * @route   GET /api/meals
 * @desc    Listar todas as refeições
 * @access  Private
 */
router.get('/', mealController.getAll);

/**
 * @route   GET /api/meals/:id
 * @desc    Obter refeição por ID
 * @access  Private
 */
router.get('/:id', mealController.getById);

/**
 * @route   GET /api/meals/mealplan/:mealPlanId
 * @desc    Obter refeições por Meal Plan ID
 * @access  Private
 */
router.get('/mealplan/:mealPlanId', mealController.getByMealPlanId);

/**
 * @route   GET /api/meals/type/:type
 * @desc    Obter refeições por tipo
 * @access  Private
 */
router.get('/type/:type', mealController.getByType);

/**
 * @route   POST /api/meals
 * @desc    Criar nova refeição
 * @access  Private
 */
router.post('/', validateRequest(createMealSchema), mealController.create);

/**
 * @route   PUT /api/meals/:id
 * @desc    Atualizar refeição
 * @access  Private
 */
router.put('/:id', validateRequest(updateMealSchema), mealController.update);

/**
 * @route   DELETE /api/meals/:id
 * @desc    Eliminar refeição
 * @access  Private
 */
router.delete('/:id', mealController.delete);

export default router;