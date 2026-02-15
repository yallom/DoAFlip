import { prisma } from '../index';

export interface CreateRecipeIngredientDTO {
  recipe_id: string;
  food_id: string;
  quantity: number;
}

export interface UpdateRecipeIngredientDTO {
  recipe_id?: string;
  food_id?: string;
  quantity?: number;
}

export interface RecipeIngredientResponse {
  id: string;
  recipe_id: string;
  food_id: string;
  quantity: number;
}

class RecipeIngredientModel {
  // Criar novo ingrediente de receita
  async create(data: CreateRecipeIngredientDTO): Promise<RecipeIngredientResponse> {
    const recipeIngredient = await prisma.recipeIngredient.create({
      data,
      include: {
        food: true,
        recipe: true
      }
    });

    return recipeIngredient;
  }

  // Buscar ingrediente de receita por ID
  async findById(id: string): Promise<RecipeIngredientResponse | null> {
    const recipeIngredient = await prisma.recipeIngredient.findUnique({
      where: { id },
      include: {
        food: true,
        recipe: true,
        replacements: true
      }
    });

    return recipeIngredient ? recipeIngredient : null;
  }

  // Buscar ingredientes por Recipe ID
  async findByRecipeId(recipeId: string): Promise<RecipeIngredientResponse[]> {
    const ingredients = await prisma.recipeIngredient.findMany({
      where: { recipe_id: recipeId },
      include: {
        food: true,
        replacements: true
      }
    });

    return ingredients;
  }

  // Buscar ingredientes por Food ID
  async findByFoodId(foodId: string): Promise<RecipeIngredientResponse[]> {
    const ingredients = await prisma.recipeIngredient.findMany({
      where: { food_id: foodId },
      include: {
        recipe: true,
        replacements: true
      }
    });

    return ingredients;
  }

  // Listar todos os ingredientes de receitas
  async findAll(): Promise<RecipeIngredientResponse[]> {
    const ingredients = await prisma.recipeIngredient.findMany({
      include: {
        food: true,
        recipe: true
      }
    });

    return ingredients;
  }

  // Atualizar ingrediente de receita
  async update(id: string, data: UpdateRecipeIngredientDTO): Promise<RecipeIngredientResponse> {
    const recipeIngredient = await prisma.recipeIngredient.update({
      where: { id },
      data,
      include: {
        food: true,
        recipe: true,
        replacements: true
      }
    });

    return recipeIngredient;
  }

  // Apagar ingrediente de receita
  async delete(id: string): Promise<void> {
    await prisma.recipeIngredient.delete({
      where: { id }
    });
  }
}

export default new RecipeIngredientModel();
