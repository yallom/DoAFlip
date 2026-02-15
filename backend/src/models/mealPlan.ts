import { prisma } from '../index';
import type { MealPlan } from '../types/types';

export interface CreateMealPlanDTO {
  id: string;
  name: string;
  user_id: string;
  start_date: Date;
  end_date: Date;
  calorie_goal: number;
  notes: string;
}

export interface UpdateMealPlanDTO {
  name?: string;
  user_id?: string;
  start_date?: Date;
  dend_date?: Date;
  calorie_goal?: number;
  notes?: string;
}

export interface MealPlanResponse {
  id: string;
  name: string;
  user_id: string;
  start_date: Date;
  dend_date: Date;
  calorie_goal: number;
  notes: string;
}

class MealPlanModel {
  // Criar novo plano alimentar
  async create(data: CreateMealPlanDTO): Promise<MealPlanResponse> {

    const mealPlan = await prisma.mealPlan.create({
      data
    });

    return mealPlan;
  }

  // Buscar plano alimentar por ID
  async findById(id: string): Promise<MealPlanResponse | null> {
    const mealPlan = await prisma.mealPlan.findUnique({
      where: { id },
    });

    return mealPlan ? mealPlan : null;
  }

  // Buscar planos alimentares por userID
  async findByUserId(userid: string): Promise<MealPlanResponse | null> {
    const mealPlan = await prisma.mealPlan.findMany({
      where: { utilizador_id: userid },
    });

    return mealPlan ? mealPlan : null;
  }

  // Listar todos os planos alimentares
  async findAll(): Promise<MealPlanResponse[]> {
    const mealPlans = await prisma.mealPlan.findMany({
      orderBy: { nome: 'asc' },
    });

    return mealPlans.map((mealPlan: MealPlan): MealPlanResponse => mealPlan);
  }

  // Atualizar plano alimentar
  async update(id: string, data: UpdateMealPlanDTO): Promise<MealPlanResponse> {
    const mealPlan = await prisma.mealPlan.update({
      where: { id },
      data,
    });

    return mealPlan;
  }

  // Apagar plano alimentar
  async delete(id: string): Promise<void> {
    await prisma.mealPlan.delete({
      where: { id }
    });

  }
}

export default new MealPlanModel();