import { type Request, type Response } from 'express';
import planoAlimentarModel, { type CreatePlanoAlimentarDTO, type UpdatePlanoAlimentarDTO } from '../models/planoalimentar';
import userModel from '../models/users';

class PlanoAlimentarController {
  // GET /planoalimentar - Listar todos os planos alimentares
  async getAll(req: Request, res: Response) {
    try {
      const planosAlimentares = await planoAlimentarModel.findAll();
      
      return res.status(200).json({
        success: true,
        data: planosAlimentares,
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
      
      const planoAlimentar = await planoAlimentarModel.findById(id);
      
      if (!planoAlimentar) {
        return res.status(404).json({
          success: false,
          message: 'Plano alimentar não encontrado',
        });
      }
      
      return res.status(200).json({
        success: true,
        data: planoAlimentar,
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
      
      const planoAlimentar = await planoAlimentarModel.findByUserId(id);
      
      if (!planoAlimentar) {
        return res.status(404).json({
          success: false,
          message: 'Plano alimentar não encontrado',
        });
      }
      
      return res.status(200).json({
        success: true,
        data: planoAlimentar,
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

      const planoAlimentarData: CreatePlanoAlimentarDTO = req.body;

      // Verificar se utilizador existe
      const userExists = await userModel.findById(planoAlimentarData.utilizador_id);
      if (!userExists) {
        return res.status(409).json({
          success: false,
          message: 'Utilizador não encontrado',
        });
      }

      const planoAlimentar = await planoAlimentarModel.create(planoAlimentarData);
      
      return res.status(201).json({
        success: true,
        message: 'Plano alimentar criado com sucesso',
        data: planoAlimentar,
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
      const planoAlimentarData: UpdatePlanoAlimentarDTO = req.body;

      // Verificar se plano alimentar existe
      const existingPlanoAlimentar = await planoAlimentarModel.findById(id);
      if (!existingPlanoAlimentar) {
        return res.status(404).json({
          success: false,
          message: 'Plano alimentar não encontrado',
        });
      }

      const updatedPlanoAlimentar = await planoAlimentarModel.update(id, planoAlimentarData);
      
      return res.status(200).json({
        success: true,
        message: 'Plano Alimentar atualizado com sucesso',
        data: updatedPlanoAlimentar,
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
      const existingPlanoAlimentar = await planoAlimentarModel.findById(id);
      if (!existingPlanoAlimentar) {
        return res.status(404).json({
          success: false,
          message: 'Plano alimentar não encontrado',
        });
      }

      await planoAlimentarModel.delete(id);
      
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

export default new PlanoAlimentarController();