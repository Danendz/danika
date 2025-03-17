import {PrismaClient} from "@prisma/client";

export const prismaConfig = {
  omit: {
    user: {
      password: true
    }
  }
} as ConstructorParameters<typeof PrismaClient>[number]