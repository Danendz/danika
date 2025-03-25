import {createTRPCRouter, protectedProcedure} from "@/trpc/init";
import {z} from "zod";
import {Prisma} from "@prisma/client";
import {prisma} from "@/plugins/prisma";
import {TRPCError} from "@trpc/server";

export const eventRouter = createTRPCRouter({
  listEvents: protectedProcedure
    .query(async ({ctx}) => {
      const user = await prisma.user.findUnique({
        where: {id: ctx.session.user.id},
        select: {
          friends: {
            select: {
              friend_id: true
            }
          }
        }
      })

      if (!user) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Session user is not found'
        })
      }

      const friendIds = user.friends.map(({friend_id}) => friend_id)

      const userIds = [...friendIds, ctx.session.user.id]

      return prisma.event.findMany({
        where: {
          user_id: {in: userIds}
        },
        select: {
          user: {
            select: {
              id: true,
              name: true,
              picture: true,
              background_picture: true,
              user_id: true,
            }
          },
          id: true,
          all_day: true,
          from: true,
          to: true,
          repeat: true,
          type: true,
          name: true
        }
      })
    }),
  createEvent: protectedProcedure
    .input(z.object({
      name: z.string().min(3),
      all_day: z.boolean().default(false),
      from: z.custom<Date>(),
      to: z.custom<Date>(),
      repeat: z.custom<Prisma.EventCreateInput['repeat']>(),
      type: z.custom<Prisma.EventCreateInput['type']>()
    })).mutation(async ({input, ctx}) => {
      const {id, name: userName} = ctx.session.user
      const {name, all_day, from, to, repeat, type} = input
      await prisma.$transaction([
        prisma.event.create({
          data: {
            user: {connect: {id: id}},
            name,
            all_day,
            from,
            to,
            repeat,
            type
          }
        }),
        prisma.notification.create({
          data: {
            all_friends: true,
            category: "EVENT_ADD",
            content: "Your friend added new event!",
            data: {user_id: id, name: userName}
          }
        })
      ])

      return true
    })
})