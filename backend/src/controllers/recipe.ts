import { type Request, type Response } from 'express';
import recipeModel, { type CreateRecipeDTO, type UpdateRecipeDTO } from '../models/recipe';
import mealModel from '../models/mealPlan';

class RecipeController {
  // GET /recipe - Listar todas as receitas
  async getAll(req: Request, res: Response) {
    try {
      const recipes = await recipeModel.findAll();
      
      return res.status(200).json({
        success: true,
        data: recipes,
      });
    } catch (error) {
      console.error('Erro ao listar receitas:', error);
      return res.status(500).json({
        success: false,
        message: 'Erro ao listar receitas',
      });
    }
  }

  // GET /recipe/:id - Buscar receita por ID
  async getById(req: Request, res: Response) {
    try {
      const { id } = req.params as { id: string };
      
      const recipe = await recipeModel.findById(id);
      
      if (!recipe) {
        return res.status(404).json({
          success: false,
          message: 'Receita não encontrada',
        });
      }
      
      return res.status(200).json({
        success: true,
        data: recipe,
      });
    } catch (error) {
      console.error('Erro ao buscar receita:', error);
      return res.status(500).json({
        success: false,
        message: 'Erro ao buscar receita',
      });
    }
  }

  // GET /recipe/meal/:mealId - Buscar receitas por Meal ID
  async getByMealId(req: Request, res: Response) {
    try {
      const { mealId } = req.params as { mealId: string };
      
      const recipes = await recipeModel.findByMealId(mealId);
      
      if (recipes.length === 0) {
        return res.status(404).json({
          success: false,
          message: 'Nenhuma receita encontrada para esta refeição',
        });
      }
      
      return res.status(200).json({
        success: true,
        data: recipes,
      });
    } catch (error) {
      console.error('Erro ao buscar receitas por meal:', error);
      return res.status(500).json({
        success: false,
        message: 'Erro ao buscar receitas',
      });
    }
  }

  // POST /recipe - Criar nova receita
  async create(req: Request, res: Response) {
    try {
      const recipeData: CreateRecipeDTO = req.body;

      // Verificar se a refeição existe (opcional, depende da lógica)
      // const mealExists = await mealModel.findById(recipeData.meal_id);
      // if (!mealExists) {
      //   return res.status(409).json({
      //     success: false,
      //     message: 'Refeição não encontrada',
      //   });
      // }

      const recipe = await recipeModel.create(recipeData);
      
      return res.status(201).json({
        success: true,
        message: 'Receita criada com sucesso',
        data: recipe,
      });
    } catch (error) {
      console.error('Erro ao criar receita:', error);
      return res.status(500).json({
        success: false,
        message: 'Erro ao criar receita',
      });
    }
  }

  // PUT /recipe/:id - Atualizar receita
  async update(req: Request, res: Response) {
    try {
      const { id } = req.params as { id: string };
      const recipeData: UpdateRecipeDTO = req.body;

      // Verificar se receita existe
      const existingRecipe = await recipeModel.findById(id);
      if (!existingRecipe) {
        return res.status(404).json({
          success: false,
          message: 'Receita não encontrada',
        });
      }

      const updatedRecipe = await recipeModel.update(id, recipeData);
      
      return res.status(200).json({
        success: true,
        message: 'Receita atualizada com sucesso',
        data: updatedRecipe,
      });
    } catch (error) {
      console.error('Erro ao atualizar receita:', error);
      return res.status(500).json({
        success: false,
        message: 'Erro ao atualizar receita',
      });
    }
  }
  
  // DELETE /recipe/:id - Eliminar receita
  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params as { id: string };

      // Verificar se receita existe
      const existingRecipe = await recipeModel.findById(id);
      if (!existingRecipe) {
        return res.status(404).json({
          success: false,
          message: 'Receita não encontrada',
        });
      }

      await recipeModel.delete(id);
      
      return res.status(200).json({
        success: true,
        message: 'Receita eliminada com sucesso',
      });
    } catch (error) {
      console.error('Erro ao eliminar receita:', error);
      return res.status(500).json({
        success: false,
        message: 'Erro ao eliminar receita',
      });
    }
  }
}

export default new RecipeController();
