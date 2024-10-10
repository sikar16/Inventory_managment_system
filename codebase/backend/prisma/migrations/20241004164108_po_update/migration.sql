/*
  Warnings:

  - You are about to drop the `_producttopurchasedorderitem` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_producttopurchasedorderitem` DROP FOREIGN KEY `_ProductToPurchasedOrderItem_A_fkey`;

-- DropForeignKey
ALTER TABLE `_producttopurchasedorderitem` DROP FOREIGN KEY `_ProductToPurchasedOrderItem_B_fkey`;

-- DropForeignKey
ALTER TABLE `purceasedrequesteditem` DROP FOREIGN KEY `PurceasedRequestedItem_productId_fkey`;

-- DropTable
DROP TABLE `_producttopurchasedorderitem`;

-- CreateTable
CREATE TABLE `_ProductToPurceasedRequestedItem` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_ProductToPurceasedRequestedItem_AB_unique`(`A`, `B`),
    INDEX `_ProductToPurceasedRequestedItem_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `PurchasedOrderItem` ADD CONSTRAINT `PurchasedOrderItem_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ProductToPurceasedRequestedItem` ADD CONSTRAINT `_ProductToPurceasedRequestedItem_A_fkey` FOREIGN KEY (`A`) REFERENCES `Product`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ProductToPurceasedRequestedItem` ADD CONSTRAINT `_ProductToPurceasedRequestedItem_B_fkey` FOREIGN KEY (`B`) REFERENCES `PurceasedRequestedItem`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
