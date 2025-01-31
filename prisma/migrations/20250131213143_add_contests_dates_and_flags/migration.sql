-- AlterTable
ALTER TABLE "Contest" ADD COLUMN     "applyEnd" TIMESTAMP(3),
ADD COLUMN     "applyStart" TIMESTAMP(3),
ADD COLUMN     "enableJudging" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "enableVoting" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "votingEnd" TIMESTAMP(3),
ADD COLUMN     "votingStart" TIMESTAMP(3),
ALTER COLUMN "enableApply" SET DEFAULT false;
