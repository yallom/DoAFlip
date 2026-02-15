import z from 'zod';

export const createRecipeSchema = z.object({
  body: z.object({
    name: z.string().min(2).max(200),
    description: z.string().optional(),
    portions: z.coerce.number().min(1),
    prep_time: z.coerce.number().min(0),
    total_calories: z.coerce.number().min(0),
    meal_id: z.string()
  })
});

export const updateRecipeSchema = z.object({
  body: z.object({
    name: z.string().min(2).max(200).optional(),
    description: z.string().optional(),
    portions: z.coerce.number().min(1).optional(),
    prep_time: z.coerce.number().min(0).optional(),
    total_calories: z.coerce.number().min(0).optional(),
    meal_id: z.string().optional()
  })
});
