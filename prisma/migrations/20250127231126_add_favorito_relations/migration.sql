-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "cellphone" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Cliente" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "cpf" TEXT NOT NULL,
    CONSTRAINT "Cliente_id_fkey" FOREIGN KEY ("id") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Agente" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "cpf" TEXT NOT NULL,
    "creci" TEXT NOT NULL,
    "imobiliariaId" TEXT,
    CONSTRAINT "Agente_id_fkey" FOREIGN KEY ("id") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Agente_imobiliariaId_fkey" FOREIGN KEY ("imobiliariaId") REFERENCES "Imobiliaria" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Imobiliaria" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "cnpj" TEXT NOT NULL,
    CONSTRAINT "Imobiliaria_id_fkey" FOREIGN KEY ("id") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Imovel" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "areaPrivada" REAL NOT NULL,
    "numQuartos" INTEGER NOT NULL,
    "numVagas" INTEGER NOT NULL,
    "tipo" TEXT NOT NULL,
    "enderecoId" TEXT NOT NULL,
    "imobiliariaId" TEXT NOT NULL,
    "agenteId" TEXT,
    "escondido" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "Imovel_imobiliariaId_fkey" FOREIGN KEY ("imobiliariaId") REFERENCES "Imobiliaria" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Imovel_enderecoId_fkey" FOREIGN KEY ("enderecoId") REFERENCES "Endereco" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Imovel_agenteId_fkey" FOREIGN KEY ("agenteId") REFERENCES "Agente" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Endereco" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "cep" INTEGER NOT NULL,
    "logradouro" TEXT NOT NULL,
    "numero" INTEGER NOT NULL,
    "bairro" TEXT NOT NULL,
    "complemento" TEXT,
    "cidade" TEXT NOT NULL,
    "estado" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Favorito" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "imovelId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Favorito_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Favorito_imovelId_fkey" FOREIGN KEY ("imovelId") REFERENCES "Imovel" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_cellphone_key" ON "User"("cellphone");

-- CreateIndex
CREATE UNIQUE INDEX "Imovel_nome_key" ON "Imovel"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "Favorito_userId_imovelId_key" ON "Favorito"("userId", "imovelId");
