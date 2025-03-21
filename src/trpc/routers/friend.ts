import {createTRPCRouter, protectedProcedure} from "@/trpc/init";
import {prisma} from "@/plugins/prisma";
import {friendSelectDetail, friendSelectList} from "@/plugins/prisma/select/friend";
import {z} from "zod";

export const friendRouter = createTRPCRouter({
  listFriends: protectedProcedure
    .query(async ({ctx}) => {
      const userId = ctx.session.user.id

      return prisma.friend.findMany({
        where: {
          friend_id: userId,
        },
        select: friendSelectList
      })
    }),
  showFriendById: protectedProcedure
    .input(z.object({friend_id: z.string()}))
    .query(async ({input}) => {
      return prisma.friend.findFirst({
        where: {
          id: input.friend_id,
        },
        select: friendSelectDetail
      })
    })
})