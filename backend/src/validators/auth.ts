import { z } from 'zod';
import { Gender, Goal, Allergie } from '../types/types';

class AuthValidator {
    // Schema para registro de novo utilizador
    readonly registerSchema = z.object({
        body: z.object({
            email: z.email('Email inválido'),
            password: z.string().min(8, 'Password deve ter no mínimo 8 caracteres'),
            name: z.string().min(2, 'Nome deve ter no mínimo 2 caracteres').max(100, 'Nome deve ter no máximo 100 caracteres'),
            age: z.number().int('Idade deve ser um número inteiro').min(13, 'Idade mínima: 13').max(120, 'Idade máxima: 120'),
            height: z.number().int('Altura deve ser um número inteiro').min(100, 'Altura mínima: 100 cm').max(250, 'Altura máxima: 250 cm'),
            weight: z.number().min(30, 'Peso mínimo: 30 kg').max(300, 'Peso máximo: 300 kg'),
            gender: z.enum(Gender, {
                message: `Género deve ser: ${Object.values(Gender).join(', ')}`,
            }),
            goal: z.enum(Goal, {
                message: `Objetivo deve ser: ${Object.values(Goal).join(', ')}`,
            }),
            allergies: z.array(z.enum(Allergie, {
                message: `Alergias devem ser: ${Object.values(Allergie).join(', ')}`,
            })).optional(),
        }),
    });

    // Schema para login
    readonly loginSchema = z.object({
        body: z.object({
            email: z.email('Email inválido')
                .min(1, 'Email é obrigatório'),

            password: z.string()
                .min(1, 'Senha é obrigatória'),
        }),
    });

    // Schema para verificar token
    readonly verifyTokenSchema = z.object({
        body: z.object({
            token: z.string()
                .min(1, 'Token é obrigatório'),
        }),
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
export type VerifyTokenInput = z.infer<typeof authValidator.verifyTokenSchema>;

// Exportar schemas para usar em middlewares
export const registerSchema = authValidator.registerSchema;
export const loginSchema = authValidator.loginSchema;
export const verifyTokenSchema = authValidator.verifyTokenSchema;
