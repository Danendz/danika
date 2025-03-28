import {protectedProcedure, createTRPCRouter, publicProcedure} from '../init';
import {prisma} from "@/plugins/prisma";
import {TRPCError} from "@trpc/server";
import {z} from "zod";
import {generateFileUrl} from "@/plugins/minio/client-utils";
import {authSchema} from "@/plugins/zod/auth";
import {hashPassword} from "@/plugins/auth/utils";
import {signOut} from "@/plugins/auth";
import {nanoid} from "nanoid";

export const userRouter = createTRPCRouter({
  createUser: publicProcedure.input(authSchema).mutation(async ({input}) => {
    const {username, password} = input

    const user = await prisma.user.findUnique({where: {username}})

    if (user) {
      throw new Error("user already exists with this username")
    }

    const hashedPass = await hashPassword(password)

    return prisma.user.create({
      data: {
        username,
        user_id: `${username}_${nanoid(7)}`,
        password: hashedPass,
        name: 'user'
      }
    })
  }),
  getCurrent: protectedProcedure.query(async ({ctx}) => {
    const id = ctx.session.user.id

    const user = await prisma.user.findUnique({
      where: {id},
      select: {
        user_id: true,
        username: true,
        id: true,
        picture: true,
        background_picture: true,
        name: true,
      }
    })

    if (!user) {
      await signOut({redirectTo: '/login'})
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'User with this session id is not found'
      })
    }

    return user
  }),
  getCurrentUserSentRequests: protectedProcedure.query(async({ctx}) => {
    const id = ctx.session.user.id

    const user = await prisma.user.findUnique({
      where: {id},
      select: {
        sent_friend_requests: {
          where: {
            status: "PENDING"
          },
          select: {
            recipient: {
              select: {
                id: true,
                name: true,
                user_id: true,
                picture: true,
                background_picture: true
              }
            }
          }
        },
      }
    })

    return user?.sent_friend_requests ?? []
  }),
  updatePicture: protectedProcedure.input(z.object({filename: z.string()})).mutation(async ({input, ctx}) => {
    const link = generateFileUrl(input.filename)
    const id = ctx.session.user.id

    return prisma.user.update({
      where: {
        id
      },
      data: {
        picture: link,
      }
    })
  }),
  updateBackgroundPicture: protectedProcedure.input(z.object({filename: z.string()})).mutation(async ({input, ctx}) => {
    const link = generateFileUrl(input.filename)
    const id = ctx.session.user.id

    return prisma.user.update({
      where: {
        id
      },
      data: {
        background_picture: link
      }
    })
  }),
  searchUser: protectedProcedure.input(z.object({search: z.string()})).query(async ({input, ctx}) => {
    const search = input.search
    const userId = ctx.session.user.id

    return prisma.user.findFirst({
      where: {
        id: {not: userId},
        user_id: search
      },
      select: {
        id: true,
        name: true,
        user_id: true,
        background_picture: true,
        picture: true
      }
    })
  })
});
