/*
  Warnings:

  - You are about to drop the `_producttopurceasedrequesteditem` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_producttopurceasedrequesteditem` DROP FOREIGN KEY `_ProductToPurceasedRequestedItem_A_fkey`;

-- DropForeignKey
ALTER TABLE `_producttopurceasedrequesteditem` DROP FOREIGN KEY `_ProductToPurceasedRequestedItem_B_fkey`;

-- DropTable
DROP TABLE `_producttopurceasedrequesteditem`;

-- AddForeignKey
ALTER TABLE `PurceasedRequestedItem` ADD CONSTRAINT `PurceasedRequestedItem_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
