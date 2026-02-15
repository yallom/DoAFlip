import z from 'zod';

export const createFoodReplacementSchema = z.object({
  body: z.object({
    recipe_ingredient_id: z.string().uuid(),
    original_food_id: z.string().uuid(),
    replacement_food_id: z.string().uuid(),
    quantity: z.coerce.number().positive(),
    similarity_score: z.coerce.number().min(0).max(1),
    justification: z.string().optional(),
    reason: z.string().optional()
  })
});

export const updateFoodReplacementSchema = z.object({
  body: z.object({
    recipe_ingredient_id: z.string().uuid().optional(),
    original_food_id: z.string().uuid().optional(),
    replacement_food_id: z.string().uuid().optional(),
    quantity: z.coerce.number().positive().optional(),
    similarity_score: z.coerce.number().min(0).max(1).optional(),
    justification: z.string().optional(),
    reason: z.string().optional()
  })
});
