import { z } from 'zod';
import { FoodCategory, type Food } from '../types/types';

/**
 * Schema para atualizar utilizador (apenas body)
 */
export const updateFoodSchema = z.object({
  params: z.object({
    id: z.string(),
  }),
  body: z.object({
    name: z
      .string()
      .max(100, 'Nome deve ter no máximo 100 caracteres')
      .trim()
      .optional(),

    normalized_name: z
      .string()
      .max(100, 'Nome normalizado deve ter no máximo 100 caracteres')
      .trim()
      .optional(),

    category: z
      .enum(FoodCategory, {
        message: `Tipo deve ser: ${Object.values(FoodCategory).join(', ')}`
      })
      .optional(),

    vit_c: z
      .number({
        message: 'Vit.C deve ser um número',
      })
      .min(0, 'Vit.C mínima: 0 mg')
      .max(100000, 'Vit.C máxima: 100000 mg')
      .optional(),

    vit_b11: z
      .number({
        message: 'Vit.B11 deve ser um número',
      })
      .min(0, 'Vit.B11 mínima: 0')
      .max(100000, 'Vit.B11 máxima: 100000 mg')
      .optional(),

    sodium: z
      .number({
        message: 'Sódio deve ser um número',
      })
      .min(0, 'Sódio mínimo: 0 mg')
      .max(100000, 'Sódio máximo: 100000 mg')
      .optional(),

    calcium: z
      .number({
        message: 'Cálcio deve ser um número',
      })
      .min(0, 'Cálcio mínimo: 0 mg')
      .max(100000, 'Cálcio máximo: 100000 mg')
      .optional(),

    iron: z
      .number({
        message: 'Ferro deve ser um número',
      })
      .min(0, 'Ferro mínimo: 0 mg')
      .max(100000, 'Ferro máximo: 100000 mg')
      .optional(),

    carbs: z
      .number({
        message: 'Carboidratos devem ser um número',
      })
      .min(0, 'Carboidratos mínimos: 0 g')
      .max(100, 'Carboidratos máximos: 100 g')
      .optional(),

    fat: z
      .number({
        message: 'Gordura deve ser um número',
      })
      .min(0, 'Gordura mínima: 0 g')
      .max(100, 'Gordura máxima: 100 g')
      .optional(),

    fiber: z
      .number({
        message: 'Fibra deve ser um número',
      })
      .min(0, 'Fibra mínima: 0 g')
      .max(100, 'Fibra máximoa: 100 g')
      .optional(),

    protein: z
      .number({
        message: 'Proteína deve ser um número',
      })
      .min(0, 'Proteína mínima: 0 g')
      .max(100, 'Proteína máxima: 100 g')
      .optional(),

    sugar: z
      .number({
        message: 'Açúcar deve ser um número',
      })
      .min(0, 'Açúcar mínimo: 0 g')
      .max(100, 'Açúcar máximo: 100 g')
      .optional(),

    calories: z
      .number({
        message: 'Calorias devem ser um número',
      })
      .min(0, 'Calorias mínimas: 0 kcal')
      .optional(),

    health_score: z
      .number({
        message: 'Health score deve ser um número',
      })
      .min(0, 'Pontuação de saúde mínima: 0')
      .max(100, 'Pontuação de saúde máxima: 100')
      .optional(),
  })
  .optional(),
});


// Tipos TypeScript inferidos dos schemas
export type UpdateUserInput = z.infer<typeof updateFoodSchema>;