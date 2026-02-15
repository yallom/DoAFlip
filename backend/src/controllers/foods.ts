import { type Request, type Response } from 'express';
import foodModel, { type CreateFoodDTO, type UpdateFoodDTO } from '../models/foods';

class FoodController {
  // GET /foods - Listar todos os alimentos
  async getAll(req: Request, res: Response) {
    try {
      const foods = await foodModel.findAll();
      
      return res.status(200).json({
        success: true,
        data: foods,
      });
    } catch (error) {
      console.error('Erro ao listar alimentos:', error);
      return res.status(500).json({
        success: false,
        message: 'Erro ao listar alimentos',
      });
    }
  }

  // GET /foods/:id - Buscar alimento por ID
  async getById(req: Request, res: Response) {
    try {
      const { id } = req.params as { id: string };
      
      const food = await foodModel.findById(id);
      
      if (!food) {
        return res.status(404).json({
          success: false,
          message: 'Alimento não encontrado',
        });
      }
      
      return res.status(200).json({
        success: true,
        data: food,
      });
    } catch (error) {
      console.error('Erro ao buscar alimento:', error);
      return res.status(500).json({
        success: false,
        message: 'Erro ao buscar alimento',
      });
    }
  }

  // POST /foods - Criar novo alimento
  async create(req: Request, res: Response) {
    try {
      // Validar dados de entrada

      const foodData: CreateFoodDTO = req.body;

      // Verificar se email já existe
      const normalised_name_exists = await foodModel.nameExists(foodData.normalized_name);
      if (normalised_name_exists) {
        return res.status(409).json({
          success: false,
          message: 'Nome normalizado já está em uso',
        });
      }

      const food = await foodModel.create(foodData);
      
      return res.status(201).json({
        success: true,
        message: 'Alimento criado com sucesso',
        data: food,
      });
    } catch (error) {
      console.error('Erro ao criar alimento:', error);
      return res.status(500).json({
        success: false,
        message: 'Erro ao criar alimento',
      });
    }
  }

  // PUT /foods/:id - Atualizar alimento
  async update(req: Request, res: Response) {
    try {
      const { id } = req.params as { id: string };
      const foodData: UpdateFoodDTO = req.body;

      // Verificar se alimento existe
      const existingFood = await foodModel.findById(id);
      if (!existingFood) {
        return res.status(404).json({
          success: false,
          message: 'Alimento não encontrado',
        });
      }

      const updatedFood = await foodModel.update(id, foodData);
      
      return res.status(200).json({
        success: true,
        message: 'Alimento atualizado com sucesso',
        data: updatedFood,
      });
    } catch (error) {
      console.error('Erro ao atualizar alimento:', error);
      return res.status(500).json({
        success: false,
        message: 'Erro ao atualizar alimento',
      });
    }
  }

  // DELETE /foods/:id - Eliminar alimento
  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params as { id: string };

      // Verificar se alimento existe
      const existingFood = await foodModel.findById(id);
      if (!existingFood) {
        return res.status(404).json({
          success: false,
          message: 'Alimento não encontrado',
        });
      }

      await foodModel.delete(id);
      
      return res.status(200).json({
        success: true,
        message: 'Alimento eliminado com sucesso',
      });
    } catch (error) {
      console.error('Erro ao eliminar alimento:', error);
      return res.status(500).json({
        success: false,
        message: 'Erro ao eliminar alimento',
      });
    }
  }
}

export default new FoodController();