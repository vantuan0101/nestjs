/*
  Warnings:

  - You are about to drop the `doccontents` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "doccontents" DROP CONSTRAINT "doccontents_docsId_fkey";

-- AlterTable
ALTER TABLE "docs" ADD COLUMN     "content" TEXT[];

-- DropTable
DROP TABLE "doccontents";
