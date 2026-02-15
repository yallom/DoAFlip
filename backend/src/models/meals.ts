import { prisma } from '../index';
import type { MealType } from '../types/types';

export interface CreateMealDTO {
  mealPlan_id: string,
  type: MealType,
  date: Date,
  total_calories: number,
}

export interface UpdateMealDTO {
  mealPlan_id: string,
  type: MealType,
  date: Date,
  total_calories: number,
}

export interface MealResponse {
  id: string,
  mealPlan_id: string,
  type: MealType,
  date: Date,
  total_calories: number,
  created_at: Date
}

class MealModel {
  async create(data: CreateMealDTO): Promise<MealResponse> {
    return await prisma.meal.create({
      data,
    });
  }

  async findById(id: string): Promise<MealResponse | null> {
    return await prisma.meal.findUnique({
      where: { id },
    });
  }

  async findByName(name: string): Promise<MealResponse | null> {
    return await prisma.meal.findFirst({
      where: { normalized_name: name.toLowerCase() },
    });
  }

  async findAll(): Promise<MealResponse[]> {
    return await prisma.meal.findMany({
      orderBy: { name: 'asc' },
    });
  }

  async findByType(type: MealType): Promise<MealResponse[]> {
    return await prisma.meal.findMany({
      where: { type: type },
      orderBy: { name: 'asc' },
    });
  }

  async update(id: string, data: UpdateMealDTO): Promise<MealResponse> {
    return await prisma.meal.update({
      where: { id },
      data,
    });
  }

  async delete(id: string): Promise<void> {
    await prisma.meal.delete({
      where: { id },
    });
  }
}

export default new MealModel();