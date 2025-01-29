-- CreateTable
CREATE TABLE "Judgevote" (
    "id" SERIAL NOT NULL,
    "contestId" INTEGER NOT NULL,
    "contestantId" INTEGER NOT NULL,
    "judgeId" INTEGER NOT NULL,
    "category" INTEGER NOT NULL,
    "rank" INTEGER NOT NULL,

    CONSTRAINT "Judgevote_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Judgevote_judgeId_category_rank_key" ON "Judgevote"("judgeId", "category", "rank");

-- AddForeignKey
ALTER TABLE "Judgevote" ADD CONSTRAINT "Judgevote_contestId_fkey" FOREIGN KEY ("contestId") REFERENCES "Contest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Judgevote" ADD CONSTRAINT "Judgevote_contestantId_fkey" FOREIGN KEY ("contestantId") REFERENCES "Contestant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Judgevote" ADD CONSTRAINT "Judgevote_judgeId_fkey" FOREIGN KEY ("judgeId") REFERENCES "Judge"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
