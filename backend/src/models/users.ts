import { prisma } from '../index';
import bcrypt from 'bcryptjs';
import { Allergie, Gender, Goal, type User } from '../types/types';
import { $Enums, type User as PrismaUser } from '@prisma/client';

export interface CreateUserDTO {
    email: string;
    password: string;
    name: string;
    age: number;
    height: number;
    weight: number;
    gender: Gender;
    goal: Goal;
    allergies: Allergie[];
}

export interface UpdateUserDTO {
    name?: string;
    age?: number;
    height?: number;
    weight?: number;
    gender?: Gender;
    goal?: Goal;
    allergies?: Allergie[];
}

export interface UserResponse {
    id: string;
    email: string;
    name: string;
    age: number;
    height: number;
    weight: number;
    gender: Gender;
    goal: Goal;
    allergies: Allergie[];
    created_at: Date;
    updated_at: Date;
}

class UserModel {
    // Criar novo user
    async create(data: CreateUserDTO): Promise<UserResponse> {
        const hashedPassword = await bcrypt.hash(data.password, 10);

        const { password, allergies, ...dataSemPassword } = data;

        const user = await prisma.user.create({
            data: {
                ...dataSemPassword,
                ...(allergies ? { alergies: allergies } : {}),
                hashPassword: hashedPassword,
            },
        });

        const sanitizableUser: User = this.mapPrismaUserToDomainUser(user);

        return this.sanitizeUser(sanitizableUser);
    }

    // Buscar user por ID
    async findById(id: string): Promise<UserResponse | null> {
        const user = await prisma.user.findUnique({
            where: { id },
        });

        if (!user) {
            return null;
        }

        const sanitizableUser: User = this.mapPrismaUserToDomainUser(user);

        return this.sanitizeUser(sanitizableUser);
    }

    // Buscar user por email
    async findByEmail(email: string): Promise<User | null> {
        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            return null;
        }

        const sanitizableUser: User = this.mapPrismaUserToDomainUser(user);
        return sanitizableUser
    }

    // Listar todos os utilizadores
    async findAll(): Promise<UserResponse[]> {
        const users = await prisma.user.findMany({
            orderBy: { created_at: 'desc' },
        });


        return users.map((user: PrismaUser): UserResponse => {
            const user1: User = this.mapPrismaUserToDomainUser(user)
            return this.sanitizeUser(user1)
        });
    }


    // Atualizar user
    async update(id: string, data: UpdateUserDTO): Promise<UserResponse> {
        const { allergies, ...rest } = data;
        const prismaData = {
            ...rest,
            ...(allergies ? { alergies: allergies } : {}),
        };

        const user = await prisma.user.update({
            where: { id },
            data: prismaData,
        });
        const sanitizableUser: User = this.mapPrismaUserToDomainUser(user);

        return this.sanitizeUser(sanitizableUser);
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

    private mapGender(gender: $Enums.Gender): Gender {
        return gender === $Enums.Gender.Masculine ? Gender.MASCULINE : Gender.FEMININE;
    }

    private mapGoal(goal: $Enums.Goal): Goal {
        return goal === $Enums.Goal.weight_loss ? Goal.WEIGHT_LOSS : goal === $Enums.Goal.muscle_gain ? Goal.MUSCLE_GAIN : Goal.MAINTENANCE;
    }

    private mapAllergies(allergies: $Enums.Allergies[]): Allergie[] {
        return allergies.map((allergy) => {
            switch (allergy) {
                case $Enums.Allergies.peanuts:
                    return Allergie.PEANUTS;
                case $Enums.Allergies.lactose:
                    return Allergie.LACTOSE;
                case $Enums.Allergies.soy:
                    return Allergie.SOY;
                case $Enums.Allergies.seafood:
                    return Allergie.SEAFOOD;
                default:
                    throw new Error(`Unknown allergy type: ${allergy}`);
            }
        });
    }

    private mapPrismaUserToDomainUser(user: PrismaUser): User {
        return {
            id: user.id,
            email: user.email,
            name: user.name,
            age: user.age,
            height: user.height,
            weight: user.weight,
            hashPassword: user.hashPassword,
            allergies: this.mapAllergies(user.alergies),
            gender: this.mapGender(user.gender),
            goal: this.mapGoal(user.goal),
            created_at: user.created_at,
            updated_at: user.updated_at,
        };
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
