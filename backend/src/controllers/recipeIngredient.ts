import { type Request, type Response } from 'express';
import recipeIngredientModel, { type CreateRecipeIngredientDTO, type UpdateRecipeIngredientDTO } from '../models/recipeIngredient';

class RecipeIngredientController {
  // GET /recipeingredient - Listar todos os ingredientes de receitas
  async getAll(req: Request, res: Response) {
    try {
      const ingredients = await recipeIngredientModel.findAll();
      
      return res.status(200).json({
        success: true,
        data: ingredients,
      });
    } catch (error) {
      console.error('Erro ao listar ingredientes de receita:', error);
      return res.status(500).json({
        success: false,
        message: 'Erro ao listar ingredientes de receita',
      });
    }
  }

  // GET /recipeingredient/:id - Buscar ingrediente de receita por ID
  async getById(req: Request, res: Response) {
    try {
      const { id } = req.params as { id: string };
      
      const ingredient = await recipeIngredientModel.findById(id);
      
      if (!ingredient) {
        return res.status(404).json({
          success: false,
          message: 'Ingrediente de receita não encontrado',
        });
      }
      
      return res.status(200).json({
        success: true,
        data: ingredient,
      });
    } catch (error) {
      console.error('Erro ao buscar ingrediente de receita:', error);
      return res.status(500).json({
        success: false,
        message: 'Erro ao buscar ingrediente de receita',
      });
    }
  }

  // GET /recipeingredient/recipe/:recipeId - Buscar ingredientes por Recipe ID
  async getByRecipeId(req: Request, res: Response) {
    try {
      const { recipeId } = req.params as { recipeId: string };
      
      const ingredients = await recipeIngredientModel.findByRecipeId(recipeId);
      
      if (ingredients.length === 0) {
        return res.status(404).json({
          success: false,
          message: 'Nenhum ingrediente encontrado para esta receita',
        });
      }
      
      return res.status(200).json({
        success: true,
        data: ingredients,
      });
    } catch (error) {
      console.error('Erro ao buscar ingredientes por receita:', error);
      return res.status(500).json({
        success: false,
        message: 'Erro ao buscar ingredientes',
      });
    }
  }

  // GET /recipeingredient/food/:foodId - Buscar ingredientes por Food ID
  async getByFoodId(req: Request, res: Response) {
    try {
      const { foodId } = req.params as { foodId: string };
      
      const ingredients = await recipeIngredientModel.findByFoodId(foodId);
      
      if (ingredients.length === 0) {
        return res.status(404).json({
          success: false,
          message: 'Nenhum ingrediente encontrado para este alimento',
        });
      }
      
      return res.status(200).json({
        success: true,
        data: ingredients,
      });
    } catch (error) {
      console.error('Erro ao buscar ingredientes por alimento:', error);
      return res.status(500).json({
        success: false,
        message: 'Erro ao buscar ingredientes',
      });
    }
  }

  // POST /recipeingredient - Criar novo ingrediente de receita
  async create(req: Request, res: Response) {
    try {
      const ingredientData: CreateRecipeIngredientDTO = req.body;

      const ingredient = await recipeIngredientModel.create(ingredientData);
      
      return res.status(201).json({
        success: true,
        message: 'Ingrediente de receita criado com sucesso',
        data: ingredient,
      });
    } catch (error) {
      console.error('Erro ao criar ingrediente de receita:', error);
      return res.status(500).json({
        success: false,
        message: 'Erro ao criar ingrediente de receita',
      });
    }
  }

  // PUT /recipeingredient/:id - Atualizar ingrediente de receita
  async update(req: Request, res: Response) {
    try {
      const { id } = req.params as { id: string };
      const ingredientData: UpdateRecipeIngredientDTO = req.body;

      // Verificar se ingrediente existe
      const existingIngredient = await recipeIngredientModel.findById(id);
      if (!existingIngredient) {
        return res.status(404).json({
          success: false,
          message: 'Ingrediente de receita não encontrado',
        });
      }

      const updatedIngredient = await recipeIngredientModel.update(id, ingredientData);
      
      return res.status(200).json({
        success: true,
        message: 'Ingrediente de receita atualizado com sucesso',
        data: updatedIngredient,
      });
    } catch (error) {
      console.error('Erro ao atualizar ingrediente de receita:', error);
      return res.status(500).json({
        success: false,
        message: 'Erro ao atualizar ingrediente de receita',
      });
    }
  }
  
  // DELETE /recipeingredient/:id - Eliminar ingrediente de receita
  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params as { id: string };

      // Verificar se ingrediente existe
      const existingIngredient = await recipeIngredientModel.findById(id);
      if (!existingIngredient) {
        return res.status(404).json({
          success: false,
          message: 'Ingrediente de receita não encontrado',
        });
      }

      await recipeIngredientModel.delete(id);
      
      return res.status(200).json({
        success: true,
        message: 'Ingrediente de receita eliminado com sucesso',
      });
    } catch (error) {
      console.error('Erro ao eliminar ingrediente de receita:', error);
      return res.status(500).json({
        success: false,
        message: 'Erro ao eliminar ingrediente de receita',
      });
    }
  }
}

export default new RecipeIngredientController();
