/*
  Warnings:

  - Added the required column `email` to the `Contestant` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Contestant" ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "instagram" TEXT;
