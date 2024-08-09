/*
  Warnings:

  - You are about to drop the column `subcity` on the `suppliers` table. All the data in the column will be lost.
  - Added the required column `subCity` to the `Suppliers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `suppliers` DROP COLUMN `subcity`,
    ADD COLUMN `subCity` VARCHAR(191) NOT NULL;
