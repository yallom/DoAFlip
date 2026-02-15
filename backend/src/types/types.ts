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

interface PlanoAlimentar {
  id: string;
  nome: string;
  utilizador_id: string;
  data_inicio: Date;
  data_fim: Date;
  meta_calorias: number;
  observacoes: string;
}

export { Gender, Goal, FoodCategory };
export type { User, PlanoAlimentar, Food };