import { prisma } from '../index';
import bcrypt from 'bcryptjs';
import type { Genero, Objetivo, Utilizador } from '../types/types';

export interface CreateUserDTO {
  email: string;
  password: string;
  nome: string;
  data_nascimento: Date;
  altura_cm: number;
  peso_kg: number;
  genero: Genero;
  objetivo: Objetivo;
}

export interface UpdateUserDTO {
  nome?: string;
  data_nascimento?: Date;
  altura_cm?: number;
  peso_kg?: number;
  genero?: Genero;
  objetivo?: Objetivo;
}

export interface UserResponse {
  id: string;
  email: string;
  nome: string;
  data_nascimento: Date;
  altura_cm: number;
  peso_kg: number;
  genero: Genero;
  objetivo: Objetivo;
  created_at: Date;
  updated_at: Date;
}

class UserModel {
  // Criar novo utilizador
  async create(data: CreateUserDTO): Promise<UserResponse> {
    const hashedPassword = await bcrypt.hash(data.password, 10);

    const { password, ...dataSemPassword } = data;

    const user = await prisma.utilizador.create({
      data: {
        ...dataSemPassword,
        hashPassword: hashedPassword,
      },
    });

    return this.sanitizeUser(user);
  }

  // Buscar utilizador por ID
  async findById(id: string): Promise<UserResponse | null> {
    const user = await prisma.utilizador.findUnique({
      where: { id },
    });

    return user ? this.sanitizeUser(user) : null;
  }

  // Buscar utilizador por email
  async findByEmail(email: string): Promise<Utilizador | null> {
    return await prisma.utilizador.findUnique({
      where: { email },
    });
  }

  // Listar todos os utilizadores
  async findAll(): Promise<UserResponse[]> {
    const users = await prisma.utilizador.findMany({
      orderBy: { created_at: 'desc' },
    });

    return users.map((user: Utilizador): UserResponse => this.sanitizeUser(user));
  }

  // Atualizar utilizador
  async update(id: string, data: UpdateUserDTO): Promise<UserResponse> {
    const user = await prisma.utilizador.update({
      where: { id },
      data,
    });

    return this.sanitizeUser(user);
  }

  // Atualizar password
  async updatePassword(id: string, newPassword: string): Promise<void> {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    
    await prisma.utilizador.update({
      where: { id },
      data: { hashPassword: hashedPassword },
    });
  }

  // Eliminar utilizador
  async delete(id: string): Promise<void> {
    await prisma.utilizador.delete({
      where: { id },
    });
  }

  // Verificar password
  async verifyPassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }

  // Remover password do objeto de resposta
  private sanitizeUser(user: Utilizador): UserResponse {
    const { hashPassword, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  // Verificar se email já existe
  async emailExists(email: string): Promise<boolean> {
    const user = await prisma.utilizador.findUnique({
      where: { email },
    });
    return !!user;
  }
}

export default new UserModel();