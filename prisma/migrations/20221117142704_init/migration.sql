-- CreateTable
CREATE TABLE "animals" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "age" INTEGER,
    "sex" TEXT,
    "latinName" TEXT,
    "habitat" TEXT NOT NULL,
    "description" TEXT,
    "menu" TEXT,
    "dateArrived" TIMESTAMP(3) NOT NULL,
    "photo" TEXT,
    "classificationId" INTEGER,
    "employeeId" INTEGER,
    "expositionId" INTEGER,

    CONSTRAINT "animals_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "animalsParentsChildren" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "parentId" INTEGER NOT NULL,
    "childId" INTEGER NOT NULL,

    CONSTRAINT "animalsParentsChildren_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "classifications" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "type" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "parentCategoryId" INTEGER,

    CONSTRAINT "classifications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "employees" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "employees_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "expositions" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "expositions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "animalsParentsChildren_parentId_childId_key" ON "animalsParentsChildren"("parentId", "childId");

-- CreateIndex
CREATE UNIQUE INDEX "classifications_parentCategoryId_key" ON "classifications"("parentCategoryId");

-- CreateIndex
CREATE UNIQUE INDEX "employees_email_key" ON "employees"("email");

-- AddForeignKey
ALTER TABLE "animals" ADD CONSTRAINT "animals_classificationId_fkey" FOREIGN KEY ("classificationId") REFERENCES "classifications"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "animals" ADD CONSTRAINT "animals_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "employees"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "animals" ADD CONSTRAINT "animals_expositionId_fkey" FOREIGN KEY ("expositionId") REFERENCES "expositions"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "animalsParentsChildren" ADD CONSTRAINT "animalsParentsChildren_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "animals"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "animalsParentsChildren" ADD CONSTRAINT "animalsParentsChildren_childId_fkey" FOREIGN KEY ("childId") REFERENCES "animals"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "classifications" ADD CONSTRAINT "classifications_parentCategoryId_fkey" FOREIGN KEY ("parentCategoryId") REFERENCES "classifications"("id") ON DELETE SET NULL ON UPDATE CASCADE;
