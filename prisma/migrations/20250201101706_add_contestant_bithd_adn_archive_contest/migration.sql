/*
  Warnings:

  - You are about to drop the column `enableApply` on the `Contest` table. All the data in the column will be lost.
  - You are about to drop the column `enableVoting` on the `Contest` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Contest" DROP COLUMN "enableApply",
DROP COLUMN "enableVoting",
ADD COLUMN     "isArchived" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Contestant" ADD COLUMN     "birthdate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
