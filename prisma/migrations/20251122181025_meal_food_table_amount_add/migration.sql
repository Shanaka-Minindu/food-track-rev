/*
  Warnings:

  - Added the required column `amount` to the `MealFood` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."MealFood" ADD COLUMN     "amount" DOUBLE PRECISION NOT NULL;
