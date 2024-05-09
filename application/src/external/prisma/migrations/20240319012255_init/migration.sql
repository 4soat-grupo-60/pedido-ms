/*
  Warnings:

  - You are about to drop the column `client_id` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the `clients` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_client_id_fkey";

-- AlterTable
ALTER TABLE "orders" DROP COLUMN "client_id",
ADD COLUMN     "client_cpf" TEXT;

-- DropTable
DROP TABLE "clients";
