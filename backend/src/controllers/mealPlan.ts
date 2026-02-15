import { type Request, type Response } from 'express';
import mealPlanModel, { type CreateMealPlanDTO, type UpdateMealPlanDTO } from '../models/mealPlan';
import userModel from '../models/users';

class MealPlanController {
  // GET /planoalimentar - Listar todos os planos alimentares
  async getAll(req: Request, res: Response) {
    try {
      const mealPlans = await mealPlanModel.findAll();
      
      return res.status(200).json({
        success: true,
        data: mealPlans,
      });
    } catch (error) {
      console.error('Erro ao listar planos alimentares:', error);
      return res.status(500).json({
        success: false,
        message: 'Erro ao listar planos alimentares',
      });
    }
  }

  // GET /planoalimentar/:id - Buscar plano alimentar por ID
  async getById(req: Request, res: Response) {
    try {
      const { id } = req.params as { id: string };
      
      const mealPlan = await mealPlanModel.findById(id);
      
      if (!mealPlan) {
        return res.status(404).json({
          success: false,
          message: 'Plano alimentar não encontrado',
        });
      }
      
      return res.status(200).json({
        success: true,
        data: mealPlan,
      });
    } catch (error) {
      console.error('Erro ao buscar plano alimentar:', error);
      return res.status(500).json({
        success: false,
        message: 'Erro ao buscar plano alimentar',
      });
    }
  }

  // GET /planoalimentar/:id - Buscar plano alimentar por ID
  async getByUserId(req: Request, res: Response) {
    try {
      const { id } = req.params as { id: string };
      
      const mealPlan = await mealPlanModel.findByUserId(id);
      
      if (!mealPlan) {
        return res.status(404).json({
          success: false,
          message: 'Plano alimentar não encontrado',
        });
      }
      
      return res.status(200).json({
        success: true,
        data: mealPlan,
      });
    } catch (error) {
      console.error('Erro ao buscar plano alimentar:', error);
      return res.status(500).json({
        success: false,
        message: 'Erro ao buscar plano alimentar',
      });
    }
  }

  // POST /planoalimentar - Criar novo plano alimentar
  async create(req: Request, res: Response) {
    try {
      // Validar dados de entrada

      const mealPlanData: CreateMealPlanDTO = req.body;

      // Verificar se utilizador existe
      const userExists = await userModel.findById(mealPlanData.utilizador_id);
      if (!userExists) {
        return res.status(409).json({
          success: false,
          message: 'Utilizador não encontrado',
        });
      }

      const mealPlan = await mealPlanModel.create(mealPlanData);
      
      return res.status(201).json({
        success: true,
        message: 'Plano alimentar criado com sucesso',
        data: mealPlan,
      });
    } catch (error) {
      console.error('Erro ao criar plano alimentar:', error);
      return res.status(500).json({
        success: false,
        message: 'Erro ao criar plano alimentar',
      });
    }
  }

  // PUT /planoalimentar/:id - Atualizar plano alimentar
  async update(req: Request, res: Response) {
    try {
      const { id } = req.params as { id: string };
      const mealPlanData: UpdateMealPlanDTO = req.body;

      // Verificar se plano alimentar existe
      const existingMealPlan = await mealPlanModel.findById(id);
      if (!existingMealPlan) {
        return res.status(404).json({
          success: false,
          message: 'Plano alimentar não encontrado',
        });
      }

      const updatedMealPlan = await mealPlanModel.update(id, mealPlanData);
      
      return res.status(200).json({
        success: true,
        message: 'Plano Alimentar atualizado com sucesso',
        data: updatedMealPlan,
      });
    } catch (error) {
      console.error('Erro ao atualizar plano alimentar:', error);
      return res.status(500).json({
        success: false,
        message: 'Erro ao atualizar plano alimentar',
      });
    }
  }
  
  // DELETE /planoalimentar/:id - Eliminar plano alimentar
  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params as { id: string };

      // Verificar se plano alimentar existe
      const existingMealPlan = await mealPlanModel.findById(id);
      if (!existingMealPlan) {
        return res.status(404).json({
          success: false,
          message: 'Plano alimentar não encontrado',
        });
      }

      await mealPlanModel.delete(id);
      
      return res.status(200).json({
        success: true,
        message: 'Plano alimentar eliminado com sucesso',
      });
    } catch (error) {
      console.error('Erro ao eliminar plano alimentar:', error);
      return res.status(500).json({
        success: false,
        message: 'Erro ao eliminar plano alimentar',
      });
    }
  }
}

export default new MealPlanController();