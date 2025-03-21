/*
  Warnings:

  - A unique constraint covering the columns `[sender_id,recipient_id,status]` on the table `FriendRequest` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "FriendRequest_recipient_id_idx";

-- DropIndex
DROP INDEX "FriendRequest_sender_id_recipient_id_key";

-- CreateIndex
CREATE INDEX "FriendRequest_recipient_id_status_idx" ON "FriendRequest"("recipient_id", "status");

-- CreateIndex
CREATE UNIQUE INDEX "FriendRequest_sender_id_recipient_id_status_key" ON "FriendRequest"("sender_id", "recipient_id", "status");
