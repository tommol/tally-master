/*
  Warnings:

  - You are about to drop the column `biogrpahy` on the `Contestant` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Contestant" DROP COLUMN "biogrpahy",
ADD COLUMN     "biography" TEXT NOT NULL DEFAULT '';
