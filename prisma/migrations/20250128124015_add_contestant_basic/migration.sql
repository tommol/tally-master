-- CreateTable
CREATE TABLE "Contestant" (
    "id" SERIAL NOT NULL,
    "contestId" INTEGER NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "city" TEXT NOT NULL,

    CONSTRAINT "Contestant_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Contestant" ADD CONSTRAINT "Contestant_contestId_fkey" FOREIGN KEY ("contestId") REFERENCES "Contest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
