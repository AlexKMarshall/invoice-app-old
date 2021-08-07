-- CreateTable
CREATE TABLE "Address" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "street" TEXT,
    "city" TEXT,
    "postcode" TEXT,
    "country" TEXT,
    "clientId" INTEGER,
    "invoiceId" INTEGER
);

-- CreateTable
CREATE TABLE "Item" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "price" INTEGER
);

-- CreateTable
CREATE TABLE "Client" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT,
    "email" TEXT,
    "addressId" INTEGER,
    FOREIGN KEY ("addressId") REFERENCES "Address" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "PaymentTerm" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "days" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "InvoiceItem" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "itemId" INTEGER NOT NULL,
    "quantity" INTEGER,
    "invoiceId" TEXT NOT NULL,
    FOREIGN KEY ("itemId") REFERENCES "Item" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY ("invoiceId") REFERENCES "Invoice" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Invoice" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME,
    "description" TEXT,
    "clientId" INTEGER,
    "senderAddressId" INTEGER,
    "status" TEXT NOT NULL,
    FOREIGN KEY ("clientId") REFERENCES "Client" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    FOREIGN KEY ("senderAddressId") REFERENCES "Address" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Client.email_unique" ON "Client"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Client_addressId_unique" ON "Client"("addressId");

-- CreateIndex
CREATE UNIQUE INDEX "Invoice_senderAddressId_unique" ON "Invoice"("senderAddressId");
