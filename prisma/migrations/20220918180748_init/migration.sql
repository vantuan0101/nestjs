-- CreateTable
CREATE TABLE "docs" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,
    "desc" TEXT NOT NULL,
    "publicIdImage" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "publicIdDemoList" TEXT[],
    "demoList" TEXT[],
    "publicIdIcon" TEXT NOT NULL,
    "icon" TEXT NOT NULL,

    CONSTRAINT "docs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "codeblocks" (
    "id" SERIAL NOT NULL,
    "DocsId" INTEGER,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,
    "content" TEXT NOT NULL,
    "publicIdIcon" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "note" TEXT,
    "outPut" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "code" TEXT NOT NULL,

    CONSTRAINT "codeblocks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,
    "email" TEXT NOT NULL,
    "hash" TEXT NOT NULL,
    "firstName" TEXT,
    "lastName" TEXT,
    "publicIdAvatar" TEXT NOT NULL,
    "avatar" TEXT,
    "role" TEXT NOT NULL DEFAULT 'user',

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "codeblocks" ADD CONSTRAINT "codeblocks_DocsId_fkey" FOREIGN KEY ("DocsId") REFERENCES "docs"("id") ON DELETE SET NULL ON UPDATE CASCADE;
