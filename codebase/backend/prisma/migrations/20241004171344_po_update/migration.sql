-- DropForeignKey
ALTER TABLE `purchasedorderitem` DROP FOREIGN KEY `PurchasedOrderItem_purchasOrderId_fkey`;

-- DropIndex
DROP INDEX `PurceasedRequestedItem_productId_fkey` ON `purceasedrequesteditem`;

-- AlterTable
ALTER TABLE `purchasedorderitem` ADD COLUMN `purchasedRequestId` INTEGER NULL;

-- CreateTable
CREATE TABLE `_PurchasedOrderToPurchasedOrderItem` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_PurchasedOrderToPurchasedOrderItem_AB_unique`(`A`, `B`),
    INDEX `_PurchasedOrderToPurchasedOrderItem_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `PurchasedOrderItem` ADD CONSTRAINT `PurchasedOrderItem_purchasedRequestId_fkey` FOREIGN KEY (`purchasedRequestId`) REFERENCES `MaterialRequest`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_PurchasedOrderToPurchasedOrderItem` ADD CONSTRAINT `_PurchasedOrderToPurchasedOrderItem_A_fkey` FOREIGN KEY (`A`) REFERENCES `PurchasedOrder`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_PurchasedOrderToPurchasedOrderItem` ADD CONSTRAINT `_PurchasedOrderToPurchasedOrderItem_B_fkey` FOREIGN KEY (`B`) REFERENCES `PurchasedOrderItem`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
