import {PrismaClient} from "@prisma/client"
import {prismaConfig} from "@/plugins/prisma/config";
import {env} from "@/env/server";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }

export const prisma = globalForPrisma.prisma || new PrismaClient(prismaConfig)

if (env.APP_ENV !== "production") globalForPrisma.prisma = prisma