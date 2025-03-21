/*
  Warnings:

  - A unique constraint covering the columns `[user_id,friend_id]` on the table `Friend` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[sender_id,recipient_id]` on the table `FriendRequest` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Friend_user_id_friend_id_key" ON "Friend"("user_id", "friend_id");

-- CreateIndex
CREATE INDEX "FriendRequest_recipient_id_idx" ON "FriendRequest"("recipient_id");

-- CreateIndex
CREATE UNIQUE INDEX "FriendRequest_sender_id_recipient_id_key" ON "FriendRequest"("sender_id", "recipient_id");
