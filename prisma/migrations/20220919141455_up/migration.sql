/*
  Warnings:

  - The `icon` column on the `codeblocks` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `demoList` column on the `docs` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `image` column on the `docs` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `icon` column on the `docs` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `avatar` column on the `users` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "codeblocks" DROP COLUMN "icon",
ADD COLUMN     "icon" JSONB[];

-- AlterTable
ALTER TABLE "docs" DROP COLUMN "demoList",
ADD COLUMN     "demoList" JSONB[],
DROP COLUMN "image",
ADD COLUMN     "image" JSONB[],
DROP COLUMN "icon",
ADD COLUMN     "icon" JSONB[];

-- AlterTable
ALTER TABLE "users" DROP COLUMN "avatar",
ADD COLUMN     "avatar" JSONB[];
