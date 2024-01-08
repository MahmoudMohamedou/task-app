-- CreateEnum
CREATE TYPE "RoleEnum" AS ENUM ('ADMIN', 'CREATE_TASK', 'DELETE_TASK');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "permissions" "RoleEnum"[];

-- CreateTable
CREATE TABLE "session" (
    "sid" TEXT NOT NULL,
    "sess" JSONB NOT NULL,
    "expire" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "session_pkey" PRIMARY KEY ("sid")
);
