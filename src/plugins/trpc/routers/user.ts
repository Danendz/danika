import { protectedProcedure, createTRPCRouter } from '../init';
import {prisma} from "@/plugins/prisma";

export const userRouter = createTRPCRouter({
  getCurrent: protectedProcedure.query(async ({ctx}) => {
    const id = ctx.session.user.id

    return prisma.user.findUnique({where: {id}})
  })
});
