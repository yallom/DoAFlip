enum Gender {
  MASCULINE = 'MASCULINE',
  FEMININE = 'FEMININE'
}

enum Goal {
  WEIGHT_LOSS = 'WEIGHT_LOSS',
  MUSCLE_GAIN = 'MUSCLE_GAIN',
  MAINTENANCE = 'MAINTENANCE',
}

enum FoodCategory {
  PROTEIN = 'PROTEIN',
  CARBOHIDRATE = 'CARBOHIDRATE',
  VEGETABLE = 'VEGETABLE',
  FRUIT = 'FRUIT',
  FAT = 'FAT',
  DAIRY = 'DAIRY',
  GRAINS = 'GRAINS',
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

export { Gender, Goal };
export type { User, PlanoAlimentar, Food };