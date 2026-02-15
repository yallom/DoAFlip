import { prisma } from '../index';
import type { FoodCategory } from '../types/types';

export interface CreateFoodDTO {
  name: string;
  normalized_name: string;
  category: FoodCategory;
  vit_c: number;
  vit_b11: number;
  sodium: number;
  calcium: number;
  iron: number;
  carbs: number;
  fat: number;
  fiber: number;
  protein: number;
  sugar: number;
  calories: number;
  health_score: number;
}

export interface UpdateFoodDTO {
  name?: string;
  normalized_name?: string;
  category?: FoodCategory;
  vit_c?: number;
  vit_b11?: number;
  sodium?: number;
  calcium?: number;
  iron?: number;
  carbs?: number;
  fat?: number;
  fiber?: number;
  protein?: number;
  sugar?: number;
  calories?: number;
  health_score?: number;
}

export interface FoodResponse {
  id: string;
  name: string;
  normalized_name: string;
  category: FoodCategory;
  vit_c: number;
  vit_b11: number;
  sodium: number;
  calcium: number;
  iron: number;
  carbs: number;
  fat: number;
  fiber: number;
  protein: number;
  sugar: number;
  calories: number;
  health_score: number;
}

class FoodModel {
  async create(data: CreateFoodDTO): Promise<FoodResponse> {
    return await prisma.food.create({
      data,
    });
  }

  async findById(id: string): Promise<FoodResponse | null> {
    return await prisma.food.findUnique({
      where: { id },
    });
  }

  async findByName(name: string): Promise<FoodResponse | null> {
    return await prisma.food.findFirst({
      where: { normalized_name: name.toLowerCase() },
    });
  }

  async findAll(): Promise<FoodResponse[]> {
    return await prisma.food.findMany({
      orderBy: { name: 'asc' },
    });
  }

  async findByCategory(category: FoodCategory): Promise<FoodResponse[]> {
    return await prisma.food.findMany({
      where: { category },
      orderBy: { name: 'asc' },
    });
  }

  async update(id: string, data: UpdateFoodDTO): Promise<FoodResponse> {
    return await prisma.food.update({
      where: { id },
      data,
    });
  }

  async delete(id: string): Promise<void> {
    await prisma.food.delete({
      where: { id },
    });
  }

  async nameExists(name: string): Promise<boolean> {
    const food = await prisma.food.findFirst({
      where: { normalized_name: name.toLowerCase() },
    });
    return !!food;
  }
}

export default new FoodModel();