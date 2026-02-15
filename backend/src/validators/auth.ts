import { z } from 'zod';
import { Gender, Goal } from '../types/types';

class AuthValidator {
  // Schema para registro de novo utilizador
  // ✅ CORRETO - schema com TODOS os campos necessários
readonly registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  nome: z.string().min(2).max(100),
  data_nascimento: z.string().transform(date => new Date(date)),
  altura_cm: z.number().int().min(100).max(250),
  peso_kg: z.number().min(30).max(300),
  genero: z.nativeEnum(Gender),
  objetivo: z.nativeEnum(Goal),
});

  // Schema para login
  readonly loginSchema = z.object({
    email: z.string()
      .email('Email inválido')
      .min(1, 'Email é obrigatório'),
    
    password: z.string()
      .min(1, 'Senha é obrigatória'),
  });

  // Schema para refresh token
  readonly refreshTokenSchema = z.object({
    refreshToken: z.string()
      .min(1, 'Token de atualização é obrigatório'),
  });

  // Schema para verificar token
  readonly verifyTokenSchema = z.object({
    token: z.string()
      .min(1, 'Token é obrigatório'),
  });

  /**
   * Valida dados de registro
   */
  validateRegister(data: unknown) {
    return this.registerSchema.safeParse(data);
  }

  /**
   * Valida dados de login
   */
  validateLogin(data: unknown) {
    return this.loginSchema.safeParse(data);
  }

  /**
   * Valida refresh token
   */
  validateRefreshToken(data: unknown) {
    return this.refreshTokenSchema.safeParse(data);
  }

  /**
   * Valida token de verificação
   */
  validateVerifyToken(data: unknown) {
    return this.verifyTokenSchema.safeParse(data);
  }
}

// Exportar instância singleton
export const authValidator = new AuthValidator();

// Types derivados dos schemas
export type RegisterInput = z.infer<typeof authValidator.registerSchema>;
export type LoginInput = z.infer<typeof authValidator.loginSchema>;
export type RefreshTokenInput = z.infer<typeof authValidator.refreshTokenSchema>;
export type VerifyTokenInput = z.infer<typeof authValidator.verifyTokenSchema>;

// Exportar schemas para usar em middlewares
export const registerSchema = authValidator.registerSchema;
export const loginSchema = authValidator.loginSchema;
export const refreshTokenSchema = authValidator.refreshTokenSchema;
export const verifyTokenSchema = authValidator.verifyTokenSchema;
