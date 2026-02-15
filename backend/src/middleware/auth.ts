import { type Request, type Response, type NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'seu-secret-super-seguro-aqui';

interface JwtPayload {
  userId: string;
  email: string;
}

// Estender o tipo Request do Express para incluir userId
declare global {
  namespace Express {
    interface Request {
      userId?: string;
      userEmail?: string;
    }
  }
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    // Obter token do header Authorization
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: 'Token não fornecido',
      });
    }

    // Extrair token (formato: "Bearer TOKEN")
    const token = authHeader.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Token inválido',
      });
    }

    // Verificar e decodificar token
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;

    // Adicionar informações do utilizador ao request
    req.userId = decoded.userId;
    req.userEmail = decoded.email;

    // Continuar para o próximo middleware/rota
    next();
  } catch (error) {
    console.error('Erro na autenticação:', error);
    
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({
        success: false,
        message: 'Token inválido',
      });
    }
    
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({
        success: false,
        message: 'Token expirado',
      });
    }

    return res.status(500).json({
      success: false,
      message: 'Erro na autenticação',
    });
  }
};

// Middleware opcional - apenas adiciona userId se token estiver presente
export const optionalAuthMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;

    if (authHeader) {
      const token = authHeader.replace('Bearer ', '');
      const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
      req.userId = decoded.userId;
      req.userEmail = decoded.email;
    }

    next();
  } catch (error) {
    // Se houver erro, continua sem autenticação
    next();
  }
};