/*
  Warnings:

  - Added the required column `icon` to the `codeblocks` table without a default value. This is not possible if the table is not empty.
  - Added the required column `note` to the `codeblocks` table without a default value. This is not possible if the table is not empty.
  - Added the required column `outPut` to the `codeblocks` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `codeblocks` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `codeblocks` table without a default value. This is not possible if the table is not empty.
  - Added the required column `desc` to the `docs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `icon` to the `docs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "codeblocks" ADD COLUMN     "icon" TEXT NOT NULL,
ADD COLUMN     "note" TEXT NOT NULL,
ADD COLUMN     "outPut" TEXT NOT NULL,
ADD COLUMN     "slug" TEXT NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "docs" ADD COLUMN     "desc" TEXT NOT NULL,
ADD COLUMN     "icon" TEXT NOT NULL,
ALTER COLUMN "title" SET NOT NULL,
ALTER COLUMN "title" SET DATA TYPE TEXT,
ALTER COLUMN "slug" SET NOT NULL,
ALTER COLUMN "slug" SET DATA TYPE TEXT;
