import { Router } from 'express';
import planoAlimentarController from '../controllers/planoalimentar';
import { authMiddleware } from '../middleware/auth';
import { validateRequest } from '../middleware/validation';
import { 
  createPlanoAlimentarSchema,
  updatePlanoAlimentarSchema
} from '../validators/planoalimentar';

const router = Router();

// Todas as rotas de users requerem autenticação
//router.use(authMiddleware);

/**
 * @route   GET /api/planoalimentar
 * @desc    Obter dados do plano alimentar autenticado
 * @access  Private
 */
router.get('/', planoAlimentarController.getAll);

/**
 * @route   GET /api/users/:id
 * @desc    Obter utilizador por ID
 * @access  Private
 */
router.get('/:id', planoAlimentarController.getById);

/**
 * @route   GET /api/planoalimentar/userid/:id
 * @desc    Obter plano alimentar por userID
 * @access  Private
 */
router.get('/userid/:id', planoAlimentarController.getByUserId);
/**
 * @route   POST /api/planoalimentar
 * @desc    Craiar novo plano alimentar
 * @access  Private
 */
router.post('/', validateRequest(createPlanoAlimentarSchema), planoAlimentarController.create);

/**
 * @route   PUT /api/planoalimentar/:id
 * @desc    Atualizar plano alimentar
 * @access  Private
 */
router.put('/:id', validateRequest(updatePlanoAlimentarSchema), planoAlimentarController.update);

/**
 * @route   DELETE /api/planoalimentar/:id
 * @desc    Eliminar plano alimentar
 * @access  Private
 */
router.delete('/:id', planoAlimentarController.delete);

export default router;