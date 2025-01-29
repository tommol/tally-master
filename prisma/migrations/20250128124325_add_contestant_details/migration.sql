/*
  Warnings:

  - Added the required column `biogrpahy` to the `Contestant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mainPhoto` to the `Contestant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `motivation` to the `Contestant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `performance` to the `Contestant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `photo1` to the `Contestant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `photo2` to the `Contestant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `plans` to the `Contestant` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Contestant" ADD COLUMN     "biogrpahy" TEXT NOT NULL,
ADD COLUMN     "mainPhoto" TEXT NOT NULL,
ADD COLUMN     "motivation" TEXT NOT NULL,
ADD COLUMN     "nickname" TEXT,
ADD COLUMN     "performance" TEXT NOT NULL,
ADD COLUMN     "photo1" TEXT NOT NULL,
ADD COLUMN     "photo2" TEXT NOT NULL,
ADD COLUMN     "plans" TEXT NOT NULL;
