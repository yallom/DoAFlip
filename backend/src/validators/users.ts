import { z } from 'zod';
import { Genero, Objetivo, type Utilizador } from '../types/types';

/**
 * Schema para atualizar utilizador (apenas body)
 */
export const updateUserSchema = z.object({
   params: z.object({
    id: z.string(),
  }),
  body: z.object({
    nome: z
        .string()
        .min(2, 'Nome deve ter no mínimo 2 caracteres')
        .max(100, 'Nome deve ter no máximo 100 caracteres')
        .trim()
        .optional(),

    data_nascimento: z
        .string()
        .refine(
        (date) => {
            if (!date) return true;
            const birthDate = new Date(date);
            const today = new Date();
            const age = today.getFullYear() - birthDate.getFullYear();
            return age >= 13 && age <= 120;
        },
        { message: 'Idade deve estar entre 13 e 120 anos' }
        )
        .refine(
        (date) => {
            if (!date) return true;
            const birthDate = new Date(date);
            const today = new Date();
            return birthDate <= today;
        },
        { message: 'Data de nascimento não pode ser no futuro' }
        )
        .optional(),

    altura_cm: z
        .number({
        message: 'Altura deve ser um número',
        })
        .int('Altura deve ser um número inteiro')
        .min(100, 'Altura mínima: 100 cm')
        .max(250, 'Altura máxima: 250 cm')
        .optional(),

    peso_kg: z
        .number({
        message: 'Peso deve ser um número',
        })
        .min(30, 'Peso mínimo: 30 kg')
        .max(300, 'Peso máximo: 300 kg')
        .optional(),

    genero: z
        .nativeEnum(Genero, {
        message: `Género deve ser: ${Object.values(Genero).join(', ')}`,
        })
        .optional(),

    objetivo: z
        .nativeEnum(Objetivo, {
        message: `Objetivo deve ser: ${Object.values(Objetivo).join(', ')}`,
        })
    })
    .optional(),
});

/**
 * Schema para atualizar password (apenas body)
 */
export const updatePasswordSchema = z
  .object({
    currentPassword: z
      .string({
        message: 'Password atual é obrigatória',
      })
      .min(1, 'Password atual não pode estar vazia'),

    newPassword: z
      .string({
        message: 'Nova password é obrigatória',
      })
      .min(6, 'Nova password deve ter no mínimo 6 caracteres')
      .max(100, 'Nova password deve ter no máximo 100 caracteres'),
  })
  .refine((data) => data.currentPassword !== data.newPassword, {
    message: 'Nova password deve ser diferente da atual',
    path: ['newPassword'],
  });

// Tipos TypeScript inferidos dos schemas
export type UpdateUserInput = z.infer<typeof updateUserSchema>;
export type UpdatePasswordInput = z.infer<typeof updatePasswordSchema>;