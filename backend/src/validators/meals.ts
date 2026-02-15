import z from 'zod';

export const createMealSchema = z.object({
  body: z.object({
    mealPlan_id: z.string().uuid(),
    type: z.enum(['breakfast', 'lunch', 'dinner', 'snack']),
    date: z.coerce.date(),
    total_calories: z.coerce.number().min(0).optional()
  })
});

export const updateMealSchema = z.object({
  body: z.object({
    mealPlan_id: z.string().uuid().optional(),
    type: z.enum(['breakfast', 'lunch', 'dinner', 'snack']).optional(),
    date: z.coerce.date().optional(),
    total_calories: z.coerce.number().min(0).optional()
  })
});