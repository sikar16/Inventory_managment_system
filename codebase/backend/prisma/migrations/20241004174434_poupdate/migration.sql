/*
  Warnings:

  - You are about to drop the column `purchasedRequestId` on the `purchasedorderitem` table. All the data in the column will be lost.
  - You are about to drop the `_purchasedordertopurchasedorderitem` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_purchasedordertopurchasedorderitem` DROP FOREIGN KEY `_PurchasedOrderToPurchasedOrderItem_A_fkey`;

-- DropForeignKey
ALTER TABLE `_purchasedordertopurchasedorderitem` DROP FOREIGN KEY `_PurchasedOrderToPurchasedOrderItem_B_fkey`;

-- DropForeignKey
ALTER TABLE `purchasedorderitem` DROP FOREIGN KEY `PurchasedOrderItem_purchasedRequestId_fkey`;

-- DropIndex
DROP INDEX `PurchasedOrderItem_purchasOrderId_fkey` ON `purchasedorderitem`;

-- AlterTable
ALTER TABLE `purchasedorderitem` DROP COLUMN `purchasedRequestId`;

-- DropTable
DROP TABLE `_purchasedordertopurchasedorderitem`;

-- CreateTable
CREATE TABLE `_MaterialRequestToPurchasedOrderItem` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_MaterialRequestToPurchasedOrderItem_AB_unique`(`A`, `B`),
    INDEX `_MaterialRequestToPurchasedOrderItem_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `PurchasedOrderItem` ADD CONSTRAINT `PurchasedOrderItem_purchasOrderId_fkey` FOREIGN KEY (`purchasOrderId`) REFERENCES `PurchasedOrder`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_MaterialRequestToPurchasedOrderItem` ADD CONSTRAINT `_MaterialRequestToPurchasedOrderItem_A_fkey` FOREIGN KEY (`A`) REFERENCES `MaterialRequest`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_MaterialRequestToPurchasedOrderItem` ADD CONSTRAINT `_MaterialRequestToPurchasedOrderItem_B_fkey` FOREIGN KEY (`B`) REFERENCES `PurchasedOrderItem`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
