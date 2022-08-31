/*
  Warnings:

  - You are about to drop the `CodeBlock` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Doccontent` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Docs` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "CodeBlock" DROP CONSTRAINT "CodeBlock_DocsId_fkey";

-- DropForeignKey
ALTER TABLE "Doccontent" DROP CONSTRAINT "Doccontent_docsId_fkey";

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "role" TEXT NOT NULL DEFAULT 'user';

-- DropTable
DROP TABLE "CodeBlock";

-- DropTable
DROP TABLE "Doccontent";

-- DropTable
DROP TABLE "Docs";

-- CreateTable
CREATE TABLE "doccontents" (
    "id" SERIAL NOT NULL,
    "data" TEXT NOT NULL,
    "docsId" INTEGER,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "doccontents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "docs" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "title" TEXT[],
    "slug" TEXT[],
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "docs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "codeblocks" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "DocsId" INTEGER,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "codeblocks_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "doccontents" ADD CONSTRAINT "doccontents_docsId_fkey" FOREIGN KEY ("docsId") REFERENCES "docs"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "codeblocks" ADD CONSTRAINT "codeblocks_DocsId_fkey" FOREIGN KEY ("DocsId") REFERENCES "docs"("id") ON DELETE SET NULL ON UPDATE CASCADE;
