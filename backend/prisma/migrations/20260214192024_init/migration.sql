-- CreateEnum
CREATE TYPE "Genero" AS ENUM ('Masculino', 'Feminino');

-- CreateEnum
CREATE TYPE "Objetivo" AS ENUM ('perda_peso', 'aumento_muscular', 'manutencao');

-- CreateEnum
CREATE TYPE "TipoRefeicao" AS ENUM ('pequeno_almoco', 'almoco', 'jantar', 'lanche');

-- CreateEnum
CREATE TYPE "CategoriaAlimento" AS ENUM ('proteina', 'carboidrato', 'vegetal', 'fruta', 'gordura', 'lacteo');

-- CreateTable
CREATE TABLE "utilizadores" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "hashPassword" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "data_nascimento" TIMESTAMP(3) NOT NULL,
    "altura_cm" INTEGER NOT NULL,
    "peso_kg" DOUBLE PRECISION NOT NULL,
    "genero" "Genero" NOT NULL,
    "objetivo" "Objetivo" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "utilizadores_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "refeicoes" (
    "id" TEXT NOT NULL,
    "planoAlimentar_id" TEXT NOT NULL,
    "tipo" "TipoRefeicao" NOT NULL,
    "data" TIMESTAMP(3) NOT NULL,
    "data_criacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "calorias_totais" DOUBLE PRECISION NOT NULL DEFAULT 0,

    CONSTRAINT "refeicoes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "planos_alimentares" (
    "id" TEXT NOT NULL,
    "utilizador_id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "data_inicio" TIMESTAMP(3) NOT NULL,
    "data_fim" TIMESTAMP(3),
    "meta_calorias" INTEGER NOT NULL,
    "observacoes" TEXT,

    CONSTRAINT "planos_alimentares_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "alimentos" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "nome_normalizado" TEXT NOT NULL,
    "categoria" "CategoriaAlimento" NOT NULL,

    CONSTRAINT "alimentos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ingredientes_receita" (
    "id" TEXT NOT NULL,
    "receita_id" TEXT NOT NULL,
    "alimento_id" TEXT NOT NULL,
    "quantidade_g" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "ingredientes_receita_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "substituicoes_alimento" (
    "id" TEXT NOT NULL,
    "ingrediente_receita_id" TEXT NOT NULL,
    "alimento_origem_id" TEXT NOT NULL,
    "alimento_substituto_id" TEXT NOT NULL,
    "quantidade_g" DOUBLE PRECISION NOT NULL,
    "similaridade_score" DOUBLE PRECISION NOT NULL,
    "justificacao" TEXT,
    "motivo" TEXT,

    CONSTRAINT "substituicoes_alimento_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "receitas" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT,
    "porcoes" INTEGER NOT NULL,
    "tempo_preparo" INTEGER NOT NULL,
    "calorias_totais" INTEGER NOT NULL,
    "refeicao_id" TEXT NOT NULL,

    CONSTRAINT "receitas_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "utilizadores_email_key" ON "utilizadores"("email");

-- CreateIndex
CREATE UNIQUE INDEX "ingredientes_receita_receita_id_alimento_id_key" ON "ingredientes_receita"("receita_id", "alimento_id");

-- AddForeignKey
ALTER TABLE "refeicoes" ADD CONSTRAINT "refeicoes_planoAlimentar_id_fkey" FOREIGN KEY ("planoAlimentar_id") REFERENCES "planos_alimentares"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "planos_alimentares" ADD CONSTRAINT "planos_alimentares_utilizador_id_fkey" FOREIGN KEY ("utilizador_id") REFERENCES "utilizadores"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ingredientes_receita" ADD CONSTRAINT "ingredientes_receita_receita_id_fkey" FOREIGN KEY ("receita_id") REFERENCES "receitas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ingredientes_receita" ADD CONSTRAINT "ingredientes_receita_alimento_id_fkey" FOREIGN KEY ("alimento_id") REFERENCES "alimentos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "substituicoes_alimento" ADD CONSTRAINT "substituicoes_alimento_ingrediente_receita_id_fkey" FOREIGN KEY ("ingrediente_receita_id") REFERENCES "ingredientes_receita"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "substituicoes_alimento" ADD CONSTRAINT "substituicoes_alimento_alimento_origem_id_fkey" FOREIGN KEY ("alimento_origem_id") REFERENCES "alimentos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "substituicoes_alimento" ADD CONSTRAINT "substituicoes_alimento_alimento_substituto_id_fkey" FOREIGN KEY ("alimento_substituto_id") REFERENCES "alimentos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "receitas" ADD CONSTRAINT "receitas_refeicao_id_fkey" FOREIGN KEY ("refeicao_id") REFERENCES "refeicoes"("id") ON DELETE CASCADE ON UPDATE CASCADE;
