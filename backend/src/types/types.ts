enum Genero {
  MASCULINO = 'MASCULINO',
  FEMININO = 'FEMININO',
  OUTRO = 'OUTRO',
}

enum Objetivo {
  PERDER_PESO = 'PERDER_PESO',
  GANHAR_MUSCULO = 'GANHAR_MUSCULO',
  MANUTENCAO = 'MANUTENCAO',
}

interface Utilizador {
  id: string;
  email: string;
  hashPassword: string;
  nome: string;
  data_nascimento: Date;
  altura_cm: number;
  peso_kg: number;
  genero: Genero;
  objetivo: Objetivo;
  created_at: Date;
  updated_at: Date;
}

type TipoRefeicao = "pequeno_almoco" | "almoco" | "jantar" | "lanche"

interface Refeicao {
  id: string;
  planoAlimentar_id: string;
  tipo: TipoRefeicao;
  data: Date;
  data_nascimento: Date;
  altura_cm: number;
  peso_kg: number;
  genero: Genero;
  objetivo: Objetivo;
  created_at: Date;
  updated_at: Date;
}

export { Genero, Objetivo };
export type { Utilizador };
