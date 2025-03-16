import {protectedProcedure, createTRPCRouter, publicProcedure} from '../init';
import {prisma} from "@/plugins/prisma";
import {TRPCError} from "@trpc/server";
import {z} from "zod";
import {generateFileUrl} from "@/plugins/minio/client-utils";
import {authSchema} from "@/plugins/zod/auth";
import {hashPassword} from "@/plugins/auth/utils";

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
        password: hashedPass,
        name: 'user'
      }
    })
  }),
  getCurrent: protectedProcedure.query(async ({ctx}) => {
    const id = ctx.session.user.id

    const user = await prisma.user.findUnique({where: {id}})

    if (!user) {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'User with this session id is not found'
      })
    }

    return user
  }),
  updatePicture: protectedProcedure.input(z.object({filename: z.string()})).mutation(async ({input, ctx}) => {
    const link = generateFileUrl('uploads', input.filename)
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
    const link = generateFileUrl('uploads', input.filename)
    const id = ctx.session.user.id

    return prisma.user.update({
      where: {
        id
      },
      data: {
        background_picture: link
      }
    })
  })
});
