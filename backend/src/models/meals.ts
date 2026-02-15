import { prisma } from '../index';
import type { MealType } from '../types/types';

export interface CreateMealDTO {
  mealPlan_id: string;
  type: MealType;
  date: Date;
  total_calories?: number;
}

export interface UpdateMealDTO {
  mealPlan_id?: string;
  type?: MealType;
  date?: Date;
  total_calories?: number;
}

export interface MealResponse {
  id: string;
  mealPlan_id: string;
  type: MealType;
  date: Date;
  total_calories: number;
  created_at: Date;
}

class MealModel {
  // Criar nova refeição
  async create(data: CreateMealDTO): Promise<MealResponse> {
    const meal = await prisma.meal.create({
      data,
      include: {
        recipes: true,
        meal_plan: true
      }
    });
    return meal as MealResponse;
  }

  // Buscar refeição por ID
  async findById(id: string): Promise<MealResponse | null> {
    const meal = await prisma.meal.findUnique({
      where: { id },
      include: {
        recipes: true,
        meal_plan: true
      }
    });
    return meal as MealResponse | null;
  }

  // Buscar refeições por Meal Plan ID
  async findByMealPlanId(mealPlanId: string): Promise<MealResponse[]> {
    const meals = await prisma.meal.findMany({
      where: { mealPlan_id: mealPlanId },
      include: {
        recipes: true
      },
      orderBy: { date: 'asc' }
    });
    return meals as MealResponse[];
  }

  // Buscar refeições por tipo
  async findByType(type: MealType): Promise<MealResponse[]> {
    const meals = await prisma.meal.findMany({
      where: { type: type as any },
      include: {
        recipes: true,
        meal_plan: true
      },
      orderBy: { date: 'asc' }
    });
    return meals as MealResponse[];
  }

  // Listar todas as refeições
  async findAll(): Promise<MealResponse[]> {
    const meals = await prisma.meal.findMany({
      include: {
        recipes: true,
        meal_plan: true
      },
      orderBy: { date: 'desc' }
    });
    return meals as MealResponse[];
  }

  // Atualizar refeição
  async update(id: string, data: UpdateMealDTO): Promise<MealResponse> {
    const meal = await prisma.meal.update({
      where: { id },
      data,
      include: {
        recipes: true,
        meal_plan: true
      }
    });
    return meal as MealResponse;
  }

  // Apagar refeição
  async delete(id: string): Promise<void> {
    await prisma.meal.delete({
      where: { id }
    });
  }
}

export default new MealModel();