import {createTRPCRouter, protectedProcedure} from "@/trpc/init";
import { z } from "zod";
import {prisma} from "@/plugins/prisma";
import {TRPCError} from "@trpc/server";

export const defaultAssetRouter = createTRPCRouter({
  getDefaultAsset: protectedProcedure.input(z.object({key: z.string()})).query(async ({input}) => {
    const asset = await prisma.defaultAsset.findUnique({where: {key: input.key}})

    if (!asset) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: `Default asset for ${input.key} not found!`
      })
    }

    return asset
  }),
})
