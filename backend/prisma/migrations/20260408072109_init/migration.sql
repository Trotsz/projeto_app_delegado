/*
  Warnings:

  - Added the required column `status` to the `Demand` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Status" AS ENUM ('SOLVED', 'ONGOING');

-- AlterTable
ALTER TABLE "Demand" ADD COLUMN     "status" "Status" NOT NULL;
