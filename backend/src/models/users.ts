import { prisma } from '../index';
import bcrypt from 'bcryptjs';
import type { Gender, Goal, User } from '../types/types';

export interface CreateUserDTO {
  email: string;
  password: string;
  name: string;
  birthDate: Date;
  height: number;
  weight: number;
  gender: Gender;
  goal: Goal;
}

export interface UpdateUserDTO {
  name?: string;
  birthDate?: Date;
  height?: number;
  weight?: number;
  gender?: Gender;
  goal?: Goal;
}

export interface UserResponse {
  id: string;
  email: string;
  name: string;
  birthDate: Date;
  height: number;
  weight: number;
  gender: Gender;
  goal: Goal;
  created_at: Date;
  updated_at: Date;
}

class UserModel {
  // Criar novo user
  async create(data: CreateUserDTO): Promise<UserResponse> {
    const hashedPassword = await bcrypt.hash(data.password, 10);

    const { password, ...dataSemPassword } = data;

    const user = await prisma.user.create({
      data: {
        ...dataSemPassword,
        hashPassword: hashedPassword,
      },
    });

    return this.sanitizeUser(user);
  }

  // Buscar user por ID
  async findById(id: string): Promise<UserResponse | null> {
    const user = await prisma.user.findUnique({
      where: { id },
    });

    return user ? this.sanitizeUser(user) : null;
  }

  // Buscar user por email
  async findByEmail(email: string): Promise<User | null> {
    return await prisma.user.findUnique({
      where: { email },
    });
  }

  // Listar todos os utilizadores
  async findAll(): Promise<UserResponse[]> {
    const users = await prisma.user.findMany({
      orderBy: { created_at: 'desc' },
    });

    return users.map((user: User): UserResponse => this.sanitizeUser(user));
  }

  // Atualizar user
  async update(id: string, data: UpdateUserDTO): Promise<UserResponse> {
    const user = await prisma.user.update({
      where: { id },
      data,
    });

    return this.sanitizeUser(user);
  }

  // Atualizar password
  async updatePassword(id: string, newPassword: string): Promise<void> {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    
    await prisma.user.update({
      where: { id },
      data: { hashPassword: hashedPassword },
    });
  }

  // Eliminar user
  async delete(id: string): Promise<void> {
    await prisma.user.delete({
      where: { id },
    });
  }

  // Verificar password
  async verifyPassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }

  // Remover password do objeto de resposta
  private sanitizeUser(user: User): UserResponse {
    const { hashPassword, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  // Verificar se email já existe
  async emailExists(email: string): Promise<boolean> {
    const user = await prisma.user.findUnique({
      where: { email },
    });
    return !!user;
  }
}

export default new UserModel();