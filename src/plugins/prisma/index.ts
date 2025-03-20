import { PrismaClient } from "@prisma/client"
import {prismaConfig} from "@/plugins/prisma/config";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }

export const prisma = globalForPrisma.prisma || new PrismaClient(prismaConfig)

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma