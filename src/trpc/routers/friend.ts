import {createTRPCRouter, protectedProcedure} from "@/trpc/init";
import {z} from "zod";
import {prisma} from "@/plugins/prisma";
import {TRPCError} from "@trpc/server";

export const friendRouter = createTRPCRouter({
  sendFriendRequest: protectedProcedure
    .input(z.object({user_id: z.string()}))
    .mutation(async ({input, ctx}) => {
      const {id: senderId, name: senderName} = ctx.session.user
      const recipientId = input.user_id

      const sentRequests = await prisma.user.findUnique({
        where: {
          id: senderId
        },
        select: {
          sent_friend_requests: {
            where: {
              recipient_id: recipientId
            }
          }
        }
      })

      if (sentRequests) {
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
          recipient_id: userId,
          status: "PENDING"
        }
      })

      if (!friendRequest) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Request couldn't be found"
        })
      }

      await prisma.$transaction([
        prisma.friend.create({
          data: {
            user_id: userId,
            friend_id: friendRequest.sender_id
          }
        }),

        prisma.friend.create({
          data: {
            user_id: friendRequest.sender_id,
            friend_id: userId
          }
        }),

        prisma.friendRequest.update({
          where: {id: requestId},
          data: {status: "ACCEPTED"}
        })
      ])
    })
})