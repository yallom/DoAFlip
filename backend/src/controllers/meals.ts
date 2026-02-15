import { type Request, type Response } from 'express';
import mealModel, { type CreateMealDTO, type UpdateMealDTO } from '../models/meals';

class MealController {
  // GET /meals - Listar todos os refeições
  async getAll(req: Request, res: Response) {
    try {
      const meals = await mealModel.findAll();
      
      return res.status(200).json({
        success: true,
        data: meals,
      });
    } catch (error) {
      console.error('Erro ao listar refeições:', error);
      return res.status(500).json({
        success: false,
        message: 'Erro ao listar refeições',
      });
    }
  }

  // GET /meals/:id - Buscar refeição por ID
  async getById(req: Request, res: Response) {
    try {
      const { id } = req.params as { id: string };
      
      const meal = await mealModel.findById(id);
      
      if (!meal) {
        return res.status(404).json({
          success: false,
          message: 'Refeição não encontrada',
        });
      }
      
      return res.status(200).json({
        success: true,
        data: meal,
      });
    } catch (error) {
      console.error('Erro ao buscar refeição:', error);
      return res.status(500).json({
        success: false,
        message: 'Erro ao buscar refeição',
      });
    }
  }

  // GET /meals/mealplan/:mealPlanId - Buscar refeições por Meal Plan ID
  async getByMealPlanId(req: Request, res: Response) {
    try {
      const { mealPlanId } = req.params as { mealPlanId: string };
      
      const meals = await mealModel.findByMealPlanId(mealPlanId);
      
      if (meals.length === 0) {
        return res.status(404).json({
          success: false,
          message: 'Nenhuma refeição encontrada para este plano alimentar',
        });
      }
      
      return res.status(200).json({
        success: true,
        data: meals,
      });
    } catch (error) {
      console.error('Erro ao buscar refeições por plano alimentar:', error);
      return res.status(500).json({
        success: false,
        message: 'Erro ao buscar refeições',
      });
    }
  }

  // GET /meals/type/:type - Buscar refeições por tipo
  async getByType(req: Request, res: Response) {
    try {
      const { type } = req.params as { type: string };
      
      const meals = await mealModel.findByType(type as any);
      
      if (meals.length === 0) {
        return res.status(404).json({
          success: false,
          message: 'Nenhuma refeição encontrada deste tipo',
        });
      }
      
      return res.status(200).json({
        success: true,
        data: meals,
      });
    } catch (error) {
      console.error('Erro ao buscar refeições por tipo:', error);
      return res.status(500).json({
        success: false,
        message: 'Erro ao buscar refeições',
      });
    }
  }

  // POST /meals - Criar novo refeição
  async create(req: Request, res: Response) {
    try {
      // Validar dados de entrada

      const foodData: CreateMealDTO = req.body;

      const meal = await mealModel.create(foodData);
      
      return res.status(201).json({
        success: true,
        message: 'Refeição criado com sucesso',
        data: meal,
      });
    } catch (error) {
      console.error('Erro ao criar refeição:', error);
      return res.status(500).json({
        success: false,
        message: 'Erro ao criar refeição',
      });
    }
  }

  // PUT /meals/:id - Atualizar refeição
  async update(req: Request, res: Response) {
    try {
      const { id } = req.params as { id: string };
      const mealData: UpdateMealDTO = req.body;

      // Verificar se refeição existe
      const existingMeal = await mealModel.findById(id);
      if (!existingMeal) {
        return res.status(404).json({
          success: false,
          message: 'Refeição não encontrada',
        });
      }

      const updatedMeal = await mealModel.update(id, mealData);
      
      return res.status(200).json({
        success: true,
        message: 'Refeição atualizado com sucesso',
        data: updatedMeal,
      });
    } catch (error) {
      console.error('Erro ao atualizar refeição:', error);
      return res.status(500).json({
        success: false,
        message: 'Erro ao atualizar refeição',
      });
    }
  }

  // DELETE /meals/:id - Eliminar refeição
  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params as { id: string };

      // Verificar se refeição existe
      const existingMeal = await mealModel.findById(id);
      if (!existingMeal) {
        return res.status(404).json({
          success: false,
          message: 'Refeição não encontrada',
        });
      }

      await mealModel.delete(id);
      
      return res.status(200).json({
        success: true,
        message: 'Refeição eliminado com sucesso',
      });
    } catch (error) {
      console.error('Erro ao eliminar refeição:', error);
      return res.status(500).json({
        success: false,
        message: 'Erro ao eliminar refeição',
      });
    }
  }

  // GET /meals/me - Obter dados do refeição autenticado
  async getMe(req: Request, res: Response) {
    try {
      // O ID do refeição vem do middleware de autenticação
      const foodId = (req as any).foodId;
      
      const meal = await mealModel.findById(foodId);
      
      if (!meal) {
        return res.status(404).json({
          success: false,
          message: 'Refeição não encontrada',
        });
      }
      
      return res.status(200).json({
        success: true,
        data: meal,
      });
    } catch (error) {
      console.error('Erro ao buscar dados do refeição:', error);
      return res.status(500).json({
        success: false,
        message: 'Erro ao buscar dados do refeição',
      });
    }
  }
}

export default new MealController();