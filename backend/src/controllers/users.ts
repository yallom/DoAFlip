import { type Request, type Response } from 'express';
import userModel, { type CreateUserDTO, type UpdateUserDTO } from '../models/users';

class UserController {
  // GET /users - Listar todos os utilizadores
  async getAll(req: Request, res: Response) {
    try {
      const users = await userModel.findAll();
      
      return res.status(200).json({
        success: true,
        data: users,
      });
    } catch (error) {
      console.error('Erro ao listar utilizadores:', error);
      return res.status(500).json({
        success: false,
        message: 'Erro ao listar utilizadores',
      });
    }
  }

  // GET /users/:id - Buscar utilizador por ID
  async getById(req: Request, res: Response) {
    try {
      const { id } = req.params as { id: string };
      
      const user = await userModel.findById(id);
      
      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'Utilizador não encontrado',
        });
      }
      
      return res.status(200).json({
        success: true,
        data: user,
      });
    } catch (error) {
      console.error('Erro ao buscar utilizador:', error);
      return res.status(500).json({
        success: false,
        message: 'Erro ao buscar utilizador',
      });
    }
  }

  // POST /users - Criar novo utilizador
  async create(req: Request, res: Response) {
    try {
      // Validar dados de entrada

      const userData: CreateUserDTO = req.body;

      // Verificar se email já existe
      const emailExists = await userModel.emailExists(userData.email);
      if (emailExists) {
        return res.status(409).json({
          success: false,
          message: 'Email já está em uso',
        });
      }

      const user = await userModel.create(userData);
      
      return res.status(201).json({
        success: true,
        message: 'Utilizador criado com sucesso',
        data: user,
      });
    } catch (error) {
      console.error('Erro ao criar utilizador:', error);
      return res.status(500).json({
        success: false,
        message: 'Erro ao criar utilizador',
      });
    }
  }

  // PUT /users/:id - Atualizar utilizador
  async update(req: Request, res: Response) {
    try {
      const { id } = req.params as { id: string };
      const userData: UpdateUserDTO = req.body;

      // Verificar se utilizador existe
      const existingUser = await userModel.findById(id);
      if (!existingUser) {
        return res.status(404).json({
          success: false,
          message: 'Utilizador não encontrado',
        });
      }

      const updatedUser = await userModel.update(id, userData);
      
      return res.status(200).json({
        success: true,
        message: 'Utilizador atualizado com sucesso',
        data: updatedUser,
      });
    } catch (error) {
      console.error('Erro ao atualizar utilizador:', error);
      return res.status(500).json({
        success: false,
        message: 'Erro ao atualizar utilizador',
      });
    }
  }

  // PATCH /users/:id/password - Atualizar password
  async updatePassword(req: Request, res: Response) {
    try {
      const { id } = req.params as { id: string };
      const { currentPassword, newPassword } = req.body;

      // Validar campos obrigatórios
      if (!currentPassword || !newPassword) {
        return res.status(400).json({
          success: false,
          message: 'Password atual e nova password são obrigatórios',
        });
      }

      // Buscar utilizador com password
      const user = await userModel.findByEmail((await userModel.findById(id))?.email || '');
      
      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'Utilizador não encontrado',
        });
      }

      // Verificar password atual
      const isPasswordValid = await userModel.verifyPassword(currentPassword, user.hashPassword);
      
      if (!isPasswordValid) {
        return res.status(401).json({
          success: false,
          message: 'Password atual incorreta',
        });
      }

      // Atualizar password
      await userModel.updatePassword(id, newPassword);
      
      return res.status(200).json({
        success: true,
        message: 'Password atualizada com sucesso',
      });
    } catch (error) {
      console.error('Erro ao atualizar password:', error);
      return res.status(500).json({
        success: false,
        message: 'Erro ao atualizar password',
      });
    }
  }

  // DELETE /users/:id - Eliminar utilizador
  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params as { id: string };

      // Verificar se utilizador existe
      const existingUser = await userModel.findById(id);
      if (!existingUser) {
        return res.status(404).json({
          success: false,
          message: 'Utilizador não encontrado',
        });
      }

      await userModel.delete(id);
      
      return res.status(200).json({
        success: true,
        message: 'Utilizador eliminado com sucesso',
      });
    } catch (error) {
      console.error('Erro ao eliminar utilizador:', error);
      return res.status(500).json({
        success: false,
        message: 'Erro ao eliminar utilizador',
      });
    }
  }

  // GET /users/me - Obter dados do utilizador autenticado
  async getMe(req: Request, res: Response) {
    try {
      // O ID do utilizador vem do middleware de autenticação
      const userId = (req as any).userId;
      
      const user = await userModel.findById(userId);
      
      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'Utilizador não encontrado',
        });
      }
      
      return res.status(200).json({
        success: true,
        data: user,
      });
    } catch (error) {
      console.error('Erro ao buscar dados do utilizador:', error);
      return res.status(500).json({
        success: false,
        message: 'Erro ao buscar dados do utilizador',
      });
    }
  }
}

export default new UserController();