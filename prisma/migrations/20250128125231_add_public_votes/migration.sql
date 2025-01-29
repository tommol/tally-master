/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `Contestant` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE "PublicVote" (
    "id" SERIAL NOT NULL,
    "contestId" INTEGER NOT NULL,
    "contestantId" INTEGER NOT NULL,
    "amount" INTEGER NOT NULL,

    CONSTRAINT "PublicVote_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PublicVote_contestId_contestantId_key" ON "PublicVote"("contestId", "contestantId");

-- CreateIndex
CREATE UNIQUE INDEX "Contestant_email_key" ON "Contestant"("email");

-- AddForeignKey
ALTER TABLE "PublicVote" ADD CONSTRAINT "PublicVote_contestId_fkey" FOREIGN KEY ("contestId") REFERENCES "Contest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PublicVote" ADD CONSTRAINT "PublicVote_contestantId_fkey" FOREIGN KEY ("contestantId") REFERENCES "Contestant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
