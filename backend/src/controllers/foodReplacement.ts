import { type Request, type Response } from 'express';
import foodReplacementModel, { type CreateFoodReplacementDTO, type UpdateFoodReplacementDTO } from '../models/foodReplacement';

class FoodReplacementController {
  // GET /foodreplacement - Listar todas as substituições de alimentos
  async getAll(req: Request, res: Response) {
    try {
      const replacements = await foodReplacementModel.findAll();
      
      return res.status(200).json({
        success: true,
        data: replacements,
      });
    } catch (error) {
      console.error('Erro ao listar substituições de alimentos:', error);
      return res.status(500).json({
        success: false,
        message: 'Erro ao listar substituições de alimentos',
      });
    }
  }

  // GET /foodreplacement/:id - Buscar substituição por ID
  async getById(req: Request, res: Response) {
    try {
      const { id } = req.params as { id: string };
      
      const replacement = await foodReplacementModel.findById(id);
      
      if (!replacement) {
        return res.status(404).json({
          success: false,
          message: 'Substituição de alimento não encontrada',
        });
      }
      
      return res.status(200).json({
        success: true,
        data: replacement,
      });
    } catch (error) {
      console.error('Erro ao buscar substituição de alimento:', error);
      return res.status(500).json({
        success: false,
        message: 'Erro ao buscar substituição de alimento',
      });
    }
  }

  // GET /foodreplacement/ingredient/:recipeIngredientId - Buscar substituições por Recipe Ingredient ID
  async getByRecipeIngredientId(req: Request, res: Response) {
    try {
      const { recipeIngredientId } = req.params as { recipeIngredientId: string };
      
      const replacements = await foodReplacementModel.findByRecipeIngredientId(recipeIngredientId);
      
      if (replacements.length === 0) {
        return res.status(404).json({
          success: false,
          message: 'Nenhuma substituição encontrada para este ingrediente',
        });
      }
      
      return res.status(200).json({
        success: true,
        data: replacements,
      });
    } catch (error) {
      console.error('Erro ao buscar substituições por ingrediente:', error);
      return res.status(500).json({
        success: false,
        message: 'Erro ao buscar substituições',
      });
    }
  }

  // GET /foodreplacement/original/:originalFoodId - Buscar substituições por Alimento Original
  async getByOriginalFoodId(req: Request, res: Response) {
    try {
      const { originalFoodId } = req.params as { originalFoodId: string };
      
      const replacements = await foodReplacementModel.findByOriginalFoodId(originalFoodId);
      
      if (replacements.length === 0) {
        return res.status(404).json({
          success: false,
          message: 'Nenhuma substituição encontrada para este alimento',
        });
      }
      
      return res.status(200).json({
        success: true,
        data: replacements,
      });
    } catch (error) {
      console.error('Erro ao buscar substituições por alimento original:', error);
      return res.status(500).json({
        success: false,
        message: 'Erro ao buscar substituições',
      });
    }
  }

  // GET /foodreplacement/replacement/:replacementFoodId - Buscar substituições por Alimento de Substituição
  async getByReplacementFoodId(req: Request, res: Response) {
    try {
      const { replacementFoodId } = req.params as { replacementFoodId: string };
      
      const replacements = await foodReplacementModel.findByReplacementFoodId(replacementFoodId);
      
      if (replacements.length === 0) {
        return res.status(404).json({
          success: false,
          message: 'Nenhuma substituição encontrada para este alimento',
        });
      }
      
      return res.status(200).json({
        success: true,
        data: replacements,
      });
    } catch (error) {
      console.error('Erro ao buscar substituições por alimento de substituição:', error);
      return res.status(500).json({
        success: false,
        message: 'Erro ao buscar substituições',
      });
    }
  }

  // POST /foodreplacement - Criar nova substituição de alimento
  async create(req: Request, res: Response) {
    try {
      const replacementData: CreateFoodReplacementDTO = req.body;

      const replacement = await foodReplacementModel.create(replacementData);
      
      return res.status(201).json({
        success: true,
        message: 'Substituição de alimento criada com sucesso',
        data: replacement,
      });
    } catch (error) {
      console.error('Erro ao criar substituição de alimento:', error);
      return res.status(500).json({
        success: false,
        message: 'Erro ao criar substituição de alimento',
      });
    }
  }

  // PUT /foodreplacement/:id - Atualizar substituição de alimento
  async update(req: Request, res: Response) {
    try {
      const { id } = req.params as { id: string };
      const replacementData: UpdateFoodReplacementDTO = req.body;

      // Verificar se substituição existe
      const existingReplacement = await foodReplacementModel.findById(id);
      if (!existingReplacement) {
        return res.status(404).json({
          success: false,
          message: 'Substituição de alimento não encontrada',
        });
      }

      const updatedReplacement = await foodReplacementModel.update(id, replacementData);
      
      return res.status(200).json({
        success: true,
        message: 'Substituição de alimento atualizada com sucesso',
        data: updatedReplacement,
      });
    } catch (error) {
      console.error('Erro ao atualizar substituição de alimento:', error);
      return res.status(500).json({
        success: false,
        message: 'Erro ao atualizar substituição de alimento',
      });
    }
  }
  
  // DELETE /foodreplacement/:id - Eliminar substituição de alimento
  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params as { id: string };

      // Verificar se substituição existe
      const existingReplacement = await foodReplacementModel.findById(id);
      if (!existingReplacement) {
        return res.status(404).json({
          success: false,
          message: 'Substituição de alimento não encontrada',
        });
      }

      await foodReplacementModel.delete(id);
      
      return res.status(200).json({
        success: true,
        message: 'Substituição de alimento eliminada com sucesso',
      });
    } catch (error) {
      console.error('Erro ao eliminar substituição de alimento:', error);
      return res.status(500).json({
        success: false,
        message: 'Erro ao eliminar substituição de alimento',
      });
    }
  }
}

export default new FoodReplacementController();
