import { prisma } from '../index';

export interface CreateFoodReplacementDTO {
  recipe_ingredient_id: string;
  original_food_id: string;
  replacement_food_id: string;
  quantity: number;
  similarity_score: number;
  justification?: string;
  reason?: string;
}

export interface UpdateFoodReplacementDTO {
  recipe_ingredient_id?: string;
  original_food_id?: string;
  replacement_food_id?: string;
  quantity?: number;
  similarity_score?: number;
  justification?: string;
  reason?: string;
}

export interface FoodReplacementResponse {
  id: string;
  recipe_ingredient_id: string;
  original_food_id: string;
  replacement_food_id: string;
  quantity: number;
  similarity_score: number;
  justification: string | null;
  reason: string | null;
}

class FoodReplacementModel {
  // Criar nova substituição de alimento
  async create(data: CreateFoodReplacementDTO): Promise<FoodReplacementResponse> {
    const foodReplacement = await prisma.foodReplacement.create({
      data,
      include: {
        recipe_ingredient: true,
        original_food: true,
        replacement_food: true
      }
    });

    return foodReplacement;
  }

  // Buscar substituição por ID
  async findById(id: string): Promise<FoodReplacementResponse | null> {
    const foodReplacement = await prisma.foodReplacement.findUnique({
      where: { id },
      include: {
        recipe_ingredient: true,
        original_food: true,
        replacement_food: true
      }
    });

    return foodReplacement ? foodReplacement : null;
  }

  // Buscar substituições por Recipe Ingredient ID
  async findByRecipeIngredientId(recipeIngredientId: string): Promise<FoodReplacementResponse[]> {
    const replacements = await prisma.foodReplacement.findMany({
      where: { recipe_ingredient_id: recipeIngredientId },
      include: {
        original_food: true,
        replacement_food: true
      }
    });

    return replacements;
  }

  // Buscar substituições por Alimento Original
  async findByOriginalFoodId(originalFoodId: string): Promise<FoodReplacementResponse[]> {
    const replacements = await prisma.foodReplacement.findMany({
      where: { original_food_id: originalFoodId },
      include: {
        recipe_ingredient: true,
        replacement_food: true
      }
    });

    return replacements;
  }

  // Buscar substituições por Alimento de Substituição
  async findByReplacementFoodId(replacementFoodId: string): Promise<FoodReplacementResponse[]> {
    const replacements = await prisma.foodReplacement.findMany({
      where: { replacement_food_id: replacementFoodId },
      include: {
        recipe_ingredient: true,
        original_food: true
      }
    });

    return replacements;
  }

  // Listar todas as substituições
  async findAll(): Promise<FoodReplacementResponse[]> {
    const replacements = await prisma.foodReplacement.findMany({
      include: {
        recipe_ingredient: true,
        original_food: true,
        replacement_food: true
      }
    });

    return replacements;
  }

  // Atualizar substituição
  async update(id: string, data: UpdateFoodReplacementDTO): Promise<FoodReplacementResponse> {
    const foodReplacement = await prisma.foodReplacement.update({
      where: { id },
      data,
      include: {
        recipe_ingredient: true,
        original_food: true,
        replacement_food: true
      }
    });

    return foodReplacement;
  }

  // Apagar substituição
  async delete(id: string): Promise<void> {
    await prisma.foodReplacement.delete({
      where: { id }
    });
  }
}

export default new FoodReplacementModel();
