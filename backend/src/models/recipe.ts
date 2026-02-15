import { prisma } from '../index';
import type { Recipe } from '../types/types';

export interface CreateRecipeDTO {
  name: string;
  description?: string;
  portions: number;
  prep_time: number;
  total_calories: number;
  meal_id?: string;
}

export interface UpdateRecipeDTO {
  name?: string;
  description?: string;
  portions?: number;
  prep_time?: number;
  total_calories?: number;
  meal_id?: string;
}

export interface RecipeResponse {
  id: string;
  name: string;
  description: string | null;
  portions: number;
  prep_time: number;
  total_calories: number;
  meal_id: string | null;
}

class RecipeModel {
  // Criar nova receita
  async create(data: CreateRecipeDTO): Promise<RecipeResponse> {
    const recipeData: any = {
      name: data.name,
      portions: data.portions,
      prep_time: data.prep_time,
      total_calories: data.total_calories
    };

    if (data.description) recipeData.description = data.description;
    if (data.meal_id) recipeData.meal_id = data.meal_id;

    const recipe = await prisma.recipe.create({
      data: recipeData
    });

    return recipe;
  }

  // Buscar receita por ID
  async findById(id: string): Promise<RecipeResponse | null> {
    const recipe = await prisma.recipe.findUnique({
      where: { id },
      include: {
        ingredients: {
          include: {
            food: true
          }
        },
        meal: true
      }
    });

    return recipe ? recipe : null;
  }

  // Buscar receitas por Meal ID
  async findByMealId(mealId: string): Promise<RecipeResponse[]> {
    const recipes = await prisma.recipe.findMany({
      where: { meal_id: mealId },
      include: {
        ingredients: {
          include: {
            food: true
          }
        }
      }
    });

    return recipes;
  }

  // Listar todas as receitas
  async findAll(): Promise<RecipeResponse[]> {
    const recipes = await prisma.recipe.findMany({
      orderBy: { name: 'asc' },
      include: {
        ingredients: {
          include: {
            food: true
          }
        },
        meal: true
      }
    });

    return recipes;
  }

  // Atualizar receita
  async update(id: string, data: UpdateRecipeDTO): Promise<RecipeResponse> {
    const recipe = await prisma.recipe.update({
      where: { id },
      data,
      include: {
        ingredients: {
          include: {
            food: true
          }
        },
        meal: true
      }
    });

    return recipe;
  }

  // Apagar receita
  async delete(id: string): Promise<void> {
    await prisma.recipe.delete({
      where: { id }
    });
  }
}

export default new RecipeModel();