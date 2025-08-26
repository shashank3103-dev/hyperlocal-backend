-- AlterTable
ALTER TABLE "User" ADD COLUMN     "isTwoFAEnabled" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "twoFASecret" TEXT;
