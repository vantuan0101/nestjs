/*
  Warnings:

  - You are about to drop the column `publicIdIcon` on the `codeblocks` table. All the data in the column will be lost.
  - The `icon` column on the `codeblocks` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `publicIdDemoList` on the `docs` table. All the data in the column will be lost.
  - You are about to drop the column `publicIdIcon` on the `docs` table. All the data in the column will be lost.
  - You are about to drop the column `publicIdImage` on the `docs` table. All the data in the column will be lost.
  - The `image` column on the `docs` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `icon` column on the `docs` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `publicIdAvatar` on the `users` table. All the data in the column will be lost.
  - The `avatar` column on the `users` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "codeblocks" DROP COLUMN "publicIdIcon",
DROP COLUMN "icon",
ADD COLUMN     "icon" TEXT[];

-- AlterTable
ALTER TABLE "docs" DROP COLUMN "publicIdDemoList",
DROP COLUMN "publicIdIcon",
DROP COLUMN "publicIdImage",
DROP COLUMN "image",
ADD COLUMN     "image" TEXT[],
DROP COLUMN "icon",
ADD COLUMN     "icon" TEXT[];

-- AlterTable
ALTER TABLE "users" DROP COLUMN "publicIdAvatar",
DROP COLUMN "avatar",
ADD COLUMN     "avatar" TEXT[];
