import z from 'zod';

export const createMealPlanSchema = z.object({
  body: z.object({
    nome: z.string().min(2).max(100),
    utilizador_id: z.string(),
    data_inicio: z.coerce.date(),
    data_fim: z.coerce.date(),
    meta_calorias: z.coerce.number().min(0),
    observacoes: z.string().optional()
  })
});

export const updateMealPlanSchema = z.object({
  body: z.object({
    nome: z.string().min(2).max(100).optional(),
    utilizador_id: z.string().optional(),
    data_inicio: z.coerce.date().optional(),
    data_fim: z.coerce.date().optional(),
    meta_calorias: z.coerce.number().min(0).optional(),
    observacoes: z.string().optional()
  })
});