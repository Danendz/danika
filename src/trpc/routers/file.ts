import {protectedProcedure, createTRPCRouter} from '../init';
import {z} from "zod";
import {generateUploadUrl} from "@/plugins/minio/utils";
import {randomUUID} from "node:crypto";

export const fileRouter = createTRPCRouter({
  generateUploadUrl: protectedProcedure.input(z.object({filename: z.string()})).mutation(async ({input}) => {
    const filename = `${randomUUID()}_${input.filename}`
    const url = await generateUploadUrl(filename)

    return {url, filename}
  }),
});
