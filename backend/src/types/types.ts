enum Genero {
  MASCULINO = 'Masculino',
  FEMININO = 'Feminino'
}

enum Objetivo {
  PERDA_PESO = 'perda_peso',
  AUMENTO_MUSCULAR = 'aumento_muscular',
  MANUTENCAO = 'manutencao',
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

interface PlanoAlimentar {
  id: string;
  nome: string;
  utilizador_id: string;
  data_inicio: Date;
  data_fim: Date;
  meta_calorias: number;
  observacoes: string;
}

export { Genero, Objetivo };
export type { Utilizador, PlanoAlimentar };