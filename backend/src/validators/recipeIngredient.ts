import z from 'zod';

export const createRecipeIngredientSchema = z.object({
  body: z.object({
    recipe_id: z.string(),
    food_id: z.string(),
    quantity: z.coerce.number().positive()
  })
});

export const updateRecipeIngredientSchema = z.object({
  body: z.object({
    recipe_id: z.string().optional(),
    food_id: z.string().optional(),
    quantity: z.coerce.number().positive().optional()
  })
});
