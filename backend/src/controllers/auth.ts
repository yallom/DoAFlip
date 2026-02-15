import { type Request, type Response } from 'express';
import jwt, { type Secret, type SignOptions } from 'jsonwebtoken';
import userModel, { type CreateUserDTO } from '../models/users';

// Configuração JWT (deve vir de variáveis de ambiente)
const JWT_SECRET: Secret = process.env.JWT_SECRET || 'seu-secret-super-seguro-aqui';
const JWT_EXPIRES_IN: string = process.env.JWT_EXPIRES_IN || '7d';

interface LoginDTO {
  email: string;
  password: string;
}

class AuthController {
  // POST /auth/register - Registar novo utilizador
  async register(req: Request, res: Response) {
    try {
      // ✅ VALIDAÇÃO JÁ FOI FEITA PELO MIDDLEWARE ZOD
      // Não precisa de validationResult do express-validator
      
      const userData: CreateUserDTO = req.body;

      // Verificar se email já existe
      const emailExists = await userModel.emailExists(userData.email);
      if (emailExists) {
        return res.status(409).json({
          success: false,
          message: 'Email já está em uso',
        });
      }

      // Criar utilizador
      const user = await userModel.create(userData);

      // Gerar token JWT
      const token = (jwt.sign as any)(
        { 
          userId: user.id,
          email: user.email 
        },
        JWT_SECRET as string,
        { expiresIn: JWT_EXPIRES_IN }
      );

      return res.status(201).json({
        success: true,
        message: 'Utilizador registado com sucesso',
        data: {
          user,
          token,
        },
      });
    } catch (error) {
      console.error('Erro ao registar utilizador:', error);
      return res.status(500).json({
        success: false,
        message: 'Erro ao registar utilizador',
      });
    }
  }

  // POST /auth/login - Fazer login
  async login(req: Request, res: Response) {
    try {
      // ✅ VALIDAÇÃO JÁ FOI FEITA PELO MIDDLEWARE ZOD
      
      const { email, password }: LoginDTO = req.body;

      // Buscar utilizador por email
      const user = await userModel.findByEmail(email);
      
      if (!user) {
        return res.status(401).json({
          success: false,
          message: 'Credenciais inválidas',
        });
      }

      // Verificar password
      const isPasswordValid = await userModel.verifyPassword(password, user.hashPassword);
      
      if (!isPasswordValid) {
        return res.status(401).json({
          success: false,
          message: 'Credenciais inválidas',
        });
      }

      // Gerar token JWT
      const token = (jwt.sign as any)(
        { 
          userId: user.id,
          email: user.email 
        },
        JWT_SECRET as string,
        { expiresIn: JWT_EXPIRES_IN }
      );

      // Remover password da resposta
      const { hashPassword, ...userWithoutPassword } = user;

      return res.status(200).json({
        success: true,
        message: 'Login efetuado com sucesso',
        data: {
          user: userWithoutPassword,
          token,
        },
      });
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      return res.status(500).json({
        success: false,
        message: 'Erro ao fazer login',
      });
    }
  }

  // POST /auth/logout - Fazer logout
  async logout(req: Request, res: Response) {
    // Com JWT stateless, o logout é feito no client removendo o token
    // Se quiser implementar blacklist de tokens, pode adicionar aqui
    return res.status(200).json({
      success: true,
      message: 'Logout efetuado com sucesso',
    });
  }

  // POST /auth/refresh - Renovar token
  async refreshToken(req: Request, res: Response) {
    try {
      const { token } = req.body;

      if (!token) {
        return res.status(400).json({
          success: false,
          message: 'Token não fornecido',
        });
      }

      // Verificar token
      const decoded = jwt.verify(token, JWT_SECRET as string) as any;

      // Gerar novo token
      const newToken = (jwt.sign as any)(
        { 
          userId: decoded.userId,
          email: decoded.email 
        },
        JWT_SECRET as string,
        { expiresIn: JWT_EXPIRES_IN }
      );

      return res.status(200).json({
        success: true,
        data: {
          token: newToken,
        },
      });
    } catch (error) {
      console.error('Erro ao renovar token:', error);
      return res.status(401).json({
        success: false,
        message: 'Token inválido ou expirado',
      });
    }
  }

  // GET /auth/verify - Verificar se token é válido
  async verifyToken(req: Request, res: Response) {
    try {
      const token = req.headers.authorization?.replace('Bearer ', '');

      if (!token) {
        return res.status(400).json({
          success: false,
          message: 'Token não fornecido',
        });
      }

      // Verificar token
      const decoded = jwt.verify(token, JWT_SECRET) as any;

      // Buscar utilizador
      const user = await userModel.findById(decoded.userId);

      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'Utilizador não encontrado',
        });
      }

      return res.status(200).json({
        success: true,
        data: {
          valid: true,
          user,
        },
      });
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: 'Token inválido ou expirado',
      });
    }
  }
}

export default new AuthController();