/*
  Warnings:

  - Added the required column `unitPrice` to the `PurceasedRequestedItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalPrice` to the `PurchasedRequest` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `purceasedrequesteditem` ADD COLUMN `unitPrice` DECIMAL(65, 30) NOT NULL;

-- AlterTable
ALTER TABLE `purchasedrequest` ADD COLUMN `totalPrice` DECIMAL(65, 30) NOT NULL;
