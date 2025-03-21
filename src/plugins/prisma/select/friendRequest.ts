import {Prisma} from "@prisma/client";

export const friendRequestSelect= {
  status: true,
  id: true,
  sender: {
    select: {
      name: true,
      picture: true,
      background_picture: true,
      user_id: true
    }
  }
} satisfies Prisma.FriendRequestSelect