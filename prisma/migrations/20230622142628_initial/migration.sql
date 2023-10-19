-- CreateExtension
CREATE EXTENSION IF NOT EXISTS "vector";

-- CreateTable
CREATE TABLE "Document" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "htmlBody" TEXT NOT NULL,
    "plainTextBody" TEXT NOT NULL,
    "embedding" vector(1536),

    CONSTRAINT "Document_pkey" PRIMARY KEY ("id")
);
