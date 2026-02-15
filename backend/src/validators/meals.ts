import { z } from 'zod';
import { MealType } from '../types/types';


export const createMealSchema = z.object({
  body: z.object({
    mealPlan_id: z.string().uuid('ID do plano alimentar deve ser um UUID válido'),
    
    type: z.enum(MealType, {
      message: 'Tipo deve ser: pequeno_almoco, almoco, jantar, lanche'
    }),
    
    date: z.string().datetime('Data deve estar no formato ISO 8601'),
    
    total_calories: z
      .number({
        message: 'Total de calorias deve ser um número',
      })
      .min(0, 'Calorias mínimas: 0')
      .max(10000, 'Calorias máximas: 10000'),
  }),
});

export const updateMealSchema = z.object({
  params: z.object({
    id: z.string().uuid('ID deve ser um UUID válido'),
  }),
  body: z.object({
    mealPlan_id: z.string().uuid('ID do plano alimentar deve ser um UUID válido').optional(),
    
    type: z.enum(MealType, {
      message: 'Tipo deve ser: pequeno_almoco, almoco, jantar, lanche'
    }).optional(),
    
    date: z.string().datetime('Data deve estar no formato ISO 8601').optional(),
    
    total_calories: z
      .number({
        message: 'Total de calorias deve ser um número',
      })
      .min(0, 'Calorias mínimas: 0')
      .max(10000, 'Calorias máximas: 10000')
      .optional(),
  }).optional(),
});