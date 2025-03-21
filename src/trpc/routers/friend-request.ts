import {createTRPCRouter, protectedProcedure} from "@/trpc/init";
import {z} from "zod";
import {prisma} from "@/plugins/prisma";
import {TRPCError} from "@trpc/server";
import {friendSelectList} from "@/plugins/prisma/select/friend";
import {friendRequestSelect} from "@/plugins/prisma/select/friendRequest";

export const friendRequestRouter = createTRPCRouter({
  listFriendRequests: protectedProcedure
    .query(async ({ctx}) => {
      const userId = ctx.session.user.id
      return await prisma.friendRequest.findMany({
        where: {
          recipient_id: userId,
          status: "PENDING"
        },
        select: friendRequestSelect
      })
    }),
  sendFriendRequest: protectedProcedure
    .input(z.object({id: z.string()}))
    .mutation(async ({input, ctx}) => {
      const {id: senderId, name: senderName} = ctx.session.user
      const recipientId = input.id

      const sentRequest = await prisma.user.findUnique({
        where: {
          id: senderId,
        },
        select: {
          sent_friend_requests: {
            where: {
              recipient_id: recipientId,
              status: "PENDING"
            }
          },
          friends: {
            where: {
              friend_id: recipientId
            }
          }
        }
      })

      if (sentRequest?.friends.length) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'This user is already in your friends list'
        })
      }

      if (sentRequest?.sent_friend_requests.length) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Friend request already was sent"
        })
      }

      await prisma.$transaction([
        prisma.friendRequest.create({
          data: {
            sender: {connect: {id: senderId}},
            recipient: {connect: {id: recipientId}},
          }
        }),
        prisma.notification.create({
          data: {
            recipient: {connect: {id: recipientId}},
            category: "FRIEND_REQUEST",
            content: "You have new friend request",
            data: {senderId, senderName: senderName}
          }
        })
      ])

      return {success: true}
    }),
  acceptFriendRequest: protectedProcedure
    .input(z.object({request_id: z.string()}))
    .mutation(async ({ctx, input}) => {
      const userId = ctx.session.user.id
      const requestId = input.request_id

      const friendRequest = await prisma.friendRequest.findUnique({
        where: {
          id: requestId,
          status: "PENDING"
        },
        select: {
          sender_id: true
        }
      })

      if (!friendRequest) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Request couldn't be found"
        })
      }

      const [_, friend] = await prisma.$transaction([
        prisma.friend.create({
          data: {
            user: {connect: {id: userId}},
            friend_id: friendRequest.sender_id
          },
        }),
        prisma.friend.create({
          data: {
            user: {connect: {id: friendRequest.sender_id}},
            friend_id: userId
          },
          select: friendSelectList
        }),
        prisma.friendRequest.update({
          where: {id: requestId},
          data: {status: "ACCEPTED"},
          select: friendRequestSelect
        })
      ])

      return friend
    }),
  rejectFriendRequest: protectedProcedure
    .input(z.object({request_id: z.string()}))
    .mutation(async ({input}) => {
      const requestId = input.request_id

      return await prisma.friendRequest.update({
        where: {
          id: requestId
        },
        data: {
          status: "REJECTED"
        },
        select: friendRequestSelect
      })
    }),
})