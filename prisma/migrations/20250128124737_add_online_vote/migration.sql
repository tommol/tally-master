-- CreateTable
CREATE TABLE "OnlineVote" (
    "id" SERIAL NOT NULL,
    "contestId" INTEGER NOT NULL,
    "contestantId" INTEGER NOT NULL,
    "phone" TEXT NOT NULL,
    "code" TEXT NOT NULL,

    CONSTRAINT "OnlineVote_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "OnlineVote_contestId_phone_key" ON "OnlineVote"("contestId", "phone");

-- AddForeignKey
ALTER TABLE "OnlineVote" ADD CONSTRAINT "OnlineVote_contestId_fkey" FOREIGN KEY ("contestId") REFERENCES "Contest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OnlineVote" ADD CONSTRAINT "OnlineVote_contestantId_fkey" FOREIGN KEY ("contestantId") REFERENCES "Contestant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
