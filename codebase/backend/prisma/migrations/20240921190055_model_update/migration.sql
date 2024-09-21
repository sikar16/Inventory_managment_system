/*
  Warnings:

  - You are about to drop the `_purceasedrequesteditemtopurchasedrequest` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_purchasedordertopurchasedorderitem` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_purceasedrequesteditemtopurchasedrequest` DROP FOREIGN KEY `_PurceasedRequestedItemToPurchasedRequest_A_fkey`;

-- DropForeignKey
ALTER TABLE `_purceasedrequesteditemtopurchasedrequest` DROP FOREIGN KEY `_PurceasedRequestedItemToPurchasedRequest_B_fkey`;

-- DropForeignKey
ALTER TABLE `_purchasedordertopurchasedorderitem` DROP FOREIGN KEY `_PurchasedOrderToPurchasedOrderItem_A_fkey`;

-- DropForeignKey
ALTER TABLE `_purchasedordertopurchasedorderitem` DROP FOREIGN KEY `_PurchasedOrderToPurchasedOrderItem_B_fkey`;

-- DropForeignKey
ALTER TABLE `purceasedrequesteditem` DROP FOREIGN KEY `PurceasedRequestedItem_purchasedRequestId_fkey`;

-- DropForeignKey
ALTER TABLE `purchasedorderitem` DROP FOREIGN KEY `PurchasedOrderItem_purchasOrderId_fkey`;

-- DropTable
DROP TABLE `_purceasedrequesteditemtopurchasedrequest`;

-- DropTable
DROP TABLE `_purchasedordertopurchasedorderitem`;

-- AddForeignKey
ALTER TABLE `PurceasedRequestedItem` ADD CONSTRAINT `PurceasedRequestedItem_purchasedRequestId_fkey` FOREIGN KEY (`purchasedRequestId`) REFERENCES `PurchasedRequest`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PurchasedOrderItem` ADD CONSTRAINT `PurchasedOrderItem_purchasOrderId_fkey` FOREIGN KEY (`purchasOrderId`) REFERENCES `PurchasedOrder`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
