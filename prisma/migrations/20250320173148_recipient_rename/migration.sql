/*
  Warnings:

  - You are about to drop the column `receiver_id` on the `FriendRequest` table. All the data in the column will be lost.
  - Added the required column `recipient_id` to the `FriendRequest` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "FriendRequest" DROP CONSTRAINT "FriendRequest_receiver_id_fkey";

-- AlterTable
ALTER TABLE "FriendRequest" DROP COLUMN "receiver_id",
ADD COLUMN     "recipient_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "FriendRequest" ADD CONSTRAINT "FriendRequest_recipient_id_fkey" FOREIGN KEY ("recipient_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
