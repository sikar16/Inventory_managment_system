/*
  Warnings:

  - You are about to drop the column `departmentId` on the `users` table. All the data in the column will be lost.
  - Added the required column `wereda` to the `Address` table without a default value. This is not possible if the table is not empty.
  - Added the required column `departmentName` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `productattribute` DROP FOREIGN KEY `ProductAttribute_productId_fkey`;

-- DropForeignKey
ALTER TABLE `users` DROP FOREIGN KEY `Users_departmentId_fkey`;

-- AlterTable
ALTER TABLE `address` ADD COLUMN `wereda` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `users` DROP COLUMN `departmentId`,
    ADD COLUMN `departmentName` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `ProductAttribute` ADD CONSTRAINT `ProductAttribute_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Users` ADD CONSTRAINT `Users_departmentName_fkey` FOREIGN KEY (`departmentName`) REFERENCES `Department`(`name`) ON DELETE RESTRICT ON UPDATE CASCADE;
