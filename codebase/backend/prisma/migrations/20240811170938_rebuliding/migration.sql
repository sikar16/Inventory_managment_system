/*
  Warnings:

  - You are about to drop the column `city` on the `store` table. All the data in the column will be lost.
  - You are about to drop the column `country` on the `store` table. All the data in the column will be lost.
  - You are about to drop the column `subCity` on the `store` table. All the data in the column will be lost.
  - You are about to drop the column `city` on the `suppliers` table. All the data in the column will be lost.
  - You are about to drop the column `country` on the `suppliers` table. All the data in the column will be lost.
  - You are about to drop the column `subCity` on the `suppliers` table. All the data in the column will be lost.
  - The values [Active,Inactive,Block] on the enum `Users_activeStatus` will be removed. If these variants are still used in the database, this will fail.
  - You are about to alter the column `role` on the `users` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(1))` to `Enum(EnumId(2))`.
  - You are about to drop the `requesteditem` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `addressId` to the `Profile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `addressId` to the `Store` table without a default value. This is not possible if the table is not empty.
  - Added the required column `addressId` to the `Suppliers` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `requesteditem` DROP FOREIGN KEY `RequestedItem_materialRequestId_fkey`;

-- AlterTable
ALTER TABLE `materialrequest` ADD COLUMN `isApproviedByDH` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `profile` ADD COLUMN `addressId` INTEGER NOT NULL,
    MODIFY `gender` ENUM('MALE', 'FEMALE') NOT NULL DEFAULT 'MALE';

-- AlterTable
ALTER TABLE `store` DROP COLUMN `city`,
    DROP COLUMN `country`,
    DROP COLUMN `subCity`,
    ADD COLUMN `addressId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `suppliercategory` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `suppliers` DROP COLUMN `city`,
    DROP COLUMN `country`,
    DROP COLUMN `subCity`,
    ADD COLUMN `addressId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `users` MODIFY `activeStatus` ENUM('ACTIVE', 'INACTIVE', 'BLOCKED') NOT NULL,
    MODIFY `role` ENUM('ADMIN', 'EMPLOYEE', 'DEPARTMENT_HEAD', 'LOGESTIC_SUPERVISER', 'FINANCE', 'GENERAL_MANAGER', 'STORE_KEEPER') NOT NULL DEFAULT 'EMPLOYEE';

-- DropTable
DROP TABLE `requesteditem`;

-- CreateTable
CREATE TABLE `ProductCategory` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ProductSubCategory` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `categoryId` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Template` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TemplateAttribute` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `templateId` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `dataType` ENUM('STRING', 'DATE_TIME', 'DOUBLE', 'INT') NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Product` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `subcategoryId` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ProductAttribute` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `productId` INTEGER NOT NULL,
    `templateAttributeId` INTEGER NOT NULL,
    `value` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Address` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `country` VARCHAR(191) NOT NULL DEFAULT 'Ethiopia',
    `city` VARCHAR(191) NOT NULL,
    `subCity` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `StoreInventory` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `storId` INTEGER NOT NULL,
    `userId` INTEGER NOT NULL,
    `productId` INTEGER NOT NULL,
    `quantity` INTEGER NOT NULL,
    `currentQuantity` INTEGER NOT NULL,
    `type` ENUM('IN', 'OUT') NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MaterialRequestItem` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `materialRequestId` INTEGER NOT NULL,
    `productId` INTEGER NOT NULL,
    `quantityRequested` DECIMAL(65, 30) NOT NULL,
    `quantityInStock` DECIMAL(65, 30) NOT NULL,
    `quantityToBePurchased` DECIMAL(65, 30) NOT NULL,
    `remark` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PurchasedRequest` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `isApproviedByGM` BOOLEAN NOT NULL DEFAULT false,
    `isApproviedByFinance` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PurceasedRequestedItem` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `purchasedRequestId` INTEGER NOT NULL,
    `quantityToBePurchased` DECIMAL(65, 30) NOT NULL,
    `remark` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PurchasedOrder` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `logesticSupperviserId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PurchasedOrderItem` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `purchasOrderId` INTEGER NOT NULL,
    `productId` INTEGER NOT NULL,
    `quantityToBePurchased` DECIMAL(65, 30) NOT NULL,
    `remark` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SupplayerOffer` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `purchasedOrderId` INTEGER NOT NULL,
    `supplayerId` INTEGER NOT NULL,
    `totalPrice` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `OfferItem` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `supplayerOfferId` INTEGER NOT NULL,
    `productId` INTEGER NOT NULL,
    `quantity` DECIMAL(65, 30) NOT NULL,
    `unitPrice` DECIMAL(65, 30) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Winner` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `supplayerId` INTEGER NOT NULL,
    `purchasedOrderId` INTEGER NOT NULL,
    `userId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `GRN` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `reciverId` INTEGER NOT NULL,
    `supplayerId` INTEGER NOT NULL,
    `productId` INTEGER NOT NULL,
    `quantity` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_ProductToPurceasedRequestedItem` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_ProductToPurceasedRequestedItem_AB_unique`(`A`, `B`),
    INDEX `_ProductToPurceasedRequestedItem_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_ProductToPurchasedOrderItem` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_ProductToPurchasedOrderItem_AB_unique`(`A`, `B`),
    INDEX `_ProductToPurchasedOrderItem_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_MaterialRequestItemToProduct` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_MaterialRequestItemToProduct_AB_unique`(`A`, `B`),
    INDEX `_MaterialRequestItemToProduct_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_PurceasedRequestedItemToPurchasedRequest` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_PurceasedRequestedItemToPurchasedRequest_AB_unique`(`A`, `B`),
    INDEX `_PurceasedRequestedItemToPurchasedRequest_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_PurchasedOrderToPurchasedOrderItem` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_PurchasedOrderToPurchasedOrderItem_AB_unique`(`A`, `B`),
    INDEX `_PurchasedOrderToPurchasedOrderItem_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_OfferItemToProduct` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_OfferItemToProduct_AB_unique`(`A`, `B`),
    INDEX `_OfferItemToProduct_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ProductSubCategory` ADD CONSTRAINT `ProductSubCategory_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `ProductCategory`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TemplateAttribute` ADD CONSTRAINT `TemplateAttribute_templateId_fkey` FOREIGN KEY (`templateId`) REFERENCES `Template`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_subcategoryId_fkey` FOREIGN KEY (`subcategoryId`) REFERENCES `ProductSubCategory`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProductAttribute` ADD CONSTRAINT `ProductAttribute_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProductAttribute` ADD CONSTRAINT `ProductAttribute_templateAttributeId_fkey` FOREIGN KEY (`templateAttributeId`) REFERENCES `TemplateAttribute`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Profile` ADD CONSTRAINT `Profile_addressId_fkey` FOREIGN KEY (`addressId`) REFERENCES `Address`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Suppliers` ADD CONSTRAINT `Suppliers_addressId_fkey` FOREIGN KEY (`addressId`) REFERENCES `Address`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Store` ADD CONSTRAINT `Store_addressId_fkey` FOREIGN KEY (`addressId`) REFERENCES `Address`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `StoreInventory` ADD CONSTRAINT `StoreInventory_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `StoreInventory` ADD CONSTRAINT `StoreInventory_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `StoreInventory` ADD CONSTRAINT `StoreInventory_storId_fkey` FOREIGN KEY (`storId`) REFERENCES `Store`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MaterialRequestItem` ADD CONSTRAINT `MaterialRequestItem_materialRequestId_fkey` FOREIGN KEY (`materialRequestId`) REFERENCES `MaterialRequest`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PurchasedRequest` ADD CONSTRAINT `PurchasedRequest_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PurceasedRequestedItem` ADD CONSTRAINT `PurceasedRequestedItem_purchasedRequestId_fkey` FOREIGN KEY (`purchasedRequestId`) REFERENCES `MaterialRequest`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PurchasedOrder` ADD CONSTRAINT `PurchasedOrder_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PurchasedOrderItem` ADD CONSTRAINT `PurchasedOrderItem_purchasOrderId_fkey` FOREIGN KEY (`purchasOrderId`) REFERENCES `MaterialRequest`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SupplayerOffer` ADD CONSTRAINT `SupplayerOffer_purchasedOrderId_fkey` FOREIGN KEY (`purchasedOrderId`) REFERENCES `PurchasedOrder`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SupplayerOffer` ADD CONSTRAINT `SupplayerOffer_supplayerId_fkey` FOREIGN KEY (`supplayerId`) REFERENCES `Suppliers`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OfferItem` ADD CONSTRAINT `OfferItem_supplayerOfferId_fkey` FOREIGN KEY (`supplayerOfferId`) REFERENCES `SupplayerOffer`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Winner` ADD CONSTRAINT `Winner_purchasedOrderId_fkey` FOREIGN KEY (`purchasedOrderId`) REFERENCES `PurchasedOrder`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Winner` ADD CONSTRAINT `Winner_supplayerId_fkey` FOREIGN KEY (`supplayerId`) REFERENCES `Suppliers`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Winner` ADD CONSTRAINT `Winner_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `GRN` ADD CONSTRAINT `GRN_reciverId_fkey` FOREIGN KEY (`reciverId`) REFERENCES `Users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `GRN` ADD CONSTRAINT `GRN_supplayerId_fkey` FOREIGN KEY (`supplayerId`) REFERENCES `Suppliers`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ProductToPurceasedRequestedItem` ADD CONSTRAINT `_ProductToPurceasedRequestedItem_A_fkey` FOREIGN KEY (`A`) REFERENCES `Product`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ProductToPurceasedRequestedItem` ADD CONSTRAINT `_ProductToPurceasedRequestedItem_B_fkey` FOREIGN KEY (`B`) REFERENCES `PurceasedRequestedItem`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ProductToPurchasedOrderItem` ADD CONSTRAINT `_ProductToPurchasedOrderItem_A_fkey` FOREIGN KEY (`A`) REFERENCES `Product`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ProductToPurchasedOrderItem` ADD CONSTRAINT `_ProductToPurchasedOrderItem_B_fkey` FOREIGN KEY (`B`) REFERENCES `PurchasedOrderItem`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_MaterialRequestItemToProduct` ADD CONSTRAINT `_MaterialRequestItemToProduct_A_fkey` FOREIGN KEY (`A`) REFERENCES `MaterialRequestItem`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_MaterialRequestItemToProduct` ADD CONSTRAINT `_MaterialRequestItemToProduct_B_fkey` FOREIGN KEY (`B`) REFERENCES `Product`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_PurceasedRequestedItemToPurchasedRequest` ADD CONSTRAINT `_PurceasedRequestedItemToPurchasedRequest_A_fkey` FOREIGN KEY (`A`) REFERENCES `PurceasedRequestedItem`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_PurceasedRequestedItemToPurchasedRequest` ADD CONSTRAINT `_PurceasedRequestedItemToPurchasedRequest_B_fkey` FOREIGN KEY (`B`) REFERENCES `PurchasedRequest`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_PurchasedOrderToPurchasedOrderItem` ADD CONSTRAINT `_PurchasedOrderToPurchasedOrderItem_A_fkey` FOREIGN KEY (`A`) REFERENCES `PurchasedOrder`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_PurchasedOrderToPurchasedOrderItem` ADD CONSTRAINT `_PurchasedOrderToPurchasedOrderItem_B_fkey` FOREIGN KEY (`B`) REFERENCES `PurchasedOrderItem`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_OfferItemToProduct` ADD CONSTRAINT `_OfferItemToProduct_A_fkey` FOREIGN KEY (`A`) REFERENCES `OfferItem`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_OfferItemToProduct` ADD CONSTRAINT `_OfferItemToProduct_B_fkey` FOREIGN KEY (`B`) REFERENCES `Product`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
