import z from 'zod';

export const createRecipeIngredientSchema = z.object({
  body: z.object({
    recipe_id: z.string().uuid(),
    food_id: z.string().uuid(),
    quantity: z.coerce.number().positive()
  })
});

export const updateRecipeIngredientSchema = z.object({
  body: z.object({
    recipe_id: z.string().uuid().optional(),
    food_id: z.string().uuid().optional(),
    quantity: z.coerce.number().positive().optional()
  })
});
