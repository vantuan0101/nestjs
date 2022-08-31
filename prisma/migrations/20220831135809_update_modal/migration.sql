/*
  Warnings:

  - You are about to drop the column `content` on the `docs` table. All the data in the column will be lost.
  - You are about to drop the `bookmarks` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `content` to the `codeblocks` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "bookmarks" DROP CONSTRAINT "bookmarks_userId_fkey";

-- AlterTable
ALTER TABLE "codeblocks" ADD COLUMN     "content" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "docs" DROP COLUMN "content";

-- DropTable
DROP TABLE "bookmarks";
