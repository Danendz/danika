import {createTRPCRouter, protectedProcedure} from "@/trpc/init";
import {z} from "zod";
import {Prisma} from "@prisma/client";
import {prisma} from "@/plugins/prisma";

export const eventRouter = createTRPCRouter({
  listEvents: protectedProcedure
    .query(() => {
      return prisma.event.findMany({
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