import { en } from "zod/locales";

enum Gender {
  MASCULINE = 'Masculine',
  FEMININE = 'Feminine'
}

enum Goal {
  WEIGHT_LOSS = 'weight_loss',
  MUSCLE_GAIN = 'muscle_gain',
  MAINTENANCE = 'maintenance',
}

enum FoodCategory {
  PROTEIN = 'protein',
  CARBOHIDRATE = 'carbohidrate',
  VEGETABLE = 'vegetable',
  FRUIT = 'fruit',
  FAT = 'fat',
  DAIRY = 'dairy',
  GRAINS = 'grains',
}

enum MealType {
  BREAKFAST = 'breakfast',
  LUNCH = 'lunch',
  DINNER = 'dinner',
  SNACK = 'snack'
}

enum Allergie {
  PEANUTS = 'peanuts',
  LACTOSE = 'lactose',
  SOY = 'soy',
  SEAFOOD = 'seafood',
}

interface User {
  id: string;
  email: string;
  hashPassword: string;
  name: string;
  birthDate: Date;
  height: number;
  weight: number;
  gender: Gender;
  goal: Goal;
  allergies: Allergie[];
  created_at: Date;
  updated_at: Date;
}

interface Food {
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

interface MealPlan {
  id: string;
  name: string;
  user_id: string;
  start_date: Date;
  end_date: Date;
  calorie_goal: number;
  notes: string;
}

interface Meal {
  id: string,
  mealPlan_id: string,
  type: MealType,
  date: Date,
  total_calories: number,
  created_at: Date
}

interface Recipe {
  id: string;
  name: string;
  description: string;
  portions: number;
  prep_time: number;
  total_calories: number;
  meal_id: string;
}

export { Gender, Goal, FoodCategory, MealType, Allergie };
export type { User, MealPlan, Food, Meal, Recipe };
