-- CreateTable
CREATE TABLE "Contest" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "year" TEXT NOT NULL,
    "logo" TEXT NOT NULL,
    "enableApply" BOOLEAN NOT NULL,

    CONSTRAINT "Contest_pkey" PRIMARY KEY ("id")
);
