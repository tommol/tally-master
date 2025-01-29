-- CreateTable
CREATE TABLE "Judge" (
    "id" SERIAL NOT NULL,
    "contestId" INTEGER NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "nickname" TEXT,
    "title" TEXT,
    "email" TEXT NOT NULL,

    CONSTRAINT "Judge_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Judge" ADD CONSTRAINT "Judge_contestId_fkey" FOREIGN KEY ("contestId") REFERENCES "Contest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
