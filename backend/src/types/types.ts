enum Gender {
  MASCULINO = 'MASCULINO',
  FEMININO = 'FEMININO',
  OUTRO = 'OUTRO',
}

enum Goal {
  PERDER_PESO = 'PERDER_PESO',
  GANHAR_MUSCULO = 'GANHAR_MUSCULO',
  MANUTENCAO = 'MANUTENCAO',
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

export { Gender, Goal };
export type { User };
