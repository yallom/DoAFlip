import { prisma } from '../index';
import type { PlanoAlimentar } from '../types/types';

export interface CreatePlanoAlimentarDTO {
  id: string;
  nome: string;
  utilizador_id: string;
  data_inicio: Date;
  data_fim: Date;
  meta_calorias: number;
  observacoes: string;
}

export interface UpdatePlanoAlimentarDTO {
  nome?: string;
  utilizador_id?: string;
  data_inicio?: Date;
  data_fim?: Date;
  meta_calorias?: number;
  observacoes?: string;
}

export interface PlanoAlimentarResponse {
  id: string;
  nome: string;
  utilizador_id: string;
  data_inicio: Date;
  data_fim: Date;
  meta_calorias: number;
  observacoes: string;
}

class PlanoAlimentarModel {
  // Criar novo plano alimentar
  async create(data: CreatePlanoAlimentarDTO): Promise<PlanoAlimentarResponse> {

    const planoAlimentar = await prisma.planoAlimentar.create({
      data
    });

    return planoAlimentar;
  }

  // Buscar plano alimentar por ID
  async findById(id: string): Promise<PlanoAlimentarResponse | null> {
    const planoAlimentar = await prisma.planoAlimentar.findUnique({
      where: { id },
    });

    return planoAlimentar ? planoAlimentar : null;
  }

  // Buscar planos alimentares por userID
  async findByUserId(userid: string): Promise<PlanoAlimentarResponse | null> {
    const planoAlimentar = await prisma.planoAlimentar.findMany({
      where: { utilizador_id: userid },
    });

    return planoAlimentar ? planoAlimentar : null;
  }

  // Listar todos os planos alimentares
  async findAll(): Promise<PlanoAlimentarResponse[]> {
    const planosAlimentares = await prisma.planoAlimentar.findMany({
      orderBy: { nome: 'asc' },
    });

    return planosAlimentares.map((planoAlimentar: PlanoAlimentar): PlanoAlimentarResponse => planoAlimentar);
  }

  // Atualizar plano alimentar
  async update(id: string, data: UpdatePlanoAlimentarDTO): Promise<PlanoAlimentarResponse> {
    const planoAlimentar = await prisma.planoAlimentar.update({
      where: { id },
      data,
    });

    return planoAlimentar;
  }

  // Apagar plano alimentar
  async delete(id: string): Promise<void> {
    await prisma.planoAlimentar.delete({
      where: { id }
    });

  }
}

export default new PlanoAlimentarModel();