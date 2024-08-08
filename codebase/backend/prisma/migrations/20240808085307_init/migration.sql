/*
  Warnings:

  - A unique constraint covering the columns `[phone]` on the table `Suppliers` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `Suppliers` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `Suppliers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `Suppliers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `suppliers` ADD COLUMN `email` VARCHAR(191) NOT NULL,
    ADD COLUMN `phone` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Suppliers_phone_key` ON `Suppliers`(`phone`);

-- CreateIndex
CREATE UNIQUE INDEX `Suppliers_email_key` ON `Suppliers`(`email`);
