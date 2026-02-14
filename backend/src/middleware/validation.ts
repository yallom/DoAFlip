import { type Request, type Response, type NextFunction } from 'express';
import { type ZodSchema } from 'zod';

/**
 * Middleware para validar dados do corpo da requisição usando Zod
 * @param schema - Schema Zod para validar
 * @returns Middleware Express
 */
export const validateRequest = (schema: ZodSchema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Validar o corpo da requisição com o schema Zod
      const validation: any = await schema.parseAsync({
        body: req.body,
        params: req.params,
        query: req.query,
      });

      if (validation.body) req.body = validation.body;
      if (validation.params) req.params = validation.params;
      if (validation.query) req.query = validation.query;
      next();
    } catch (error: any) {
      // Se houver erro de validação, retornar resposta com detalhes
      const errors = error.errors?.map((err: any) => ({
        field: err.path.join('.'),
        message: err.message,
      })) || [];

      return res.status(400).json({
        success: false,
        message: 'Erro de validação',
        errors,
      });
    }
  };
};

/**
 * Middleware para validar dados de query parameters usando Zod
 * @param schema - Schema Zod para validar
 * @returns Middleware Express
 */
export const validateQuery = (schema: ZodSchema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validation = await schema.parseAsync(req.query);
      req.query = validation as any;
      next();
    } catch (error: any) {
      const errors = error.errors?.map((err: any) => ({
        field: err.path.join('.'),
        message: err.message,
      })) || [];

      return res.status(400).json({
        success: false,
        message: 'Erro de validação',
        errors,
      });
    }
  };
};
