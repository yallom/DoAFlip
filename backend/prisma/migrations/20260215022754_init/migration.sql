/*
  Warnings:

  - Added the required column `calcium` to the `foods` table without a default value. This is not possible if the table is not empty.
  - Added the required column `calories` to the `foods` table without a default value. This is not possible if the table is not empty.
  - Added the required column `carbs` to the `foods` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fat` to the `foods` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fiber` to the `foods` table without a default value. This is not possible if the table is not empty.
  - Added the required column `health_score` to the `foods` table without a default value. This is not possible if the table is not empty.
  - Added the required column `iron` to the `foods` table without a default value. This is not possible if the table is not empty.
  - Added the required column `protein` to the `foods` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sodium` to the `foods` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sugar` to the `foods` table without a default value. This is not possible if the table is not empty.
  - Added the required column `vit_b11` to the `foods` table without a default value. This is not possible if the table is not empty.
  - Added the required column `vit_c` to the `foods` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
ALTER TYPE "FoodCategory" ADD VALUE 'grains';

-- AlterTable
ALTER TABLE "foods" ADD COLUMN     "calcium" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "calories" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "carbs" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "fat" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "fiber" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "health_score" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "iron" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "protein" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "sodium" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "sugar" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "vit_b11" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "vit_c" DOUBLE PRECISION NOT NULL;
