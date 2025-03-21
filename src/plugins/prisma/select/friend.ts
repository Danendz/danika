import { Prisma } from "@prisma/client";

export const friendSelectList= {
  id: true,
  user: {
    select: {
      id: true,
      name: true,
      picture: true,
      background_picture: true,
      user_id: true,
    }
  }
} satisfies Prisma.FriendSelect

export const friendSelectDetail = {
  id: true,
  user: {
    select: {
      name: true,
      picture: true,
      background_picture: true,
      user_id: true
    }
  }
} satisfies Prisma.FriendSelect