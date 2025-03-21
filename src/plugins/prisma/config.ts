import {PrismaClient} from "@prisma/client";

export const prismaConfig: ConstructorParameters<typeof PrismaClient>[number] = {
  omit: {
    user: {
      password: true
    },
    friendRequest: {
      sender_id: true,
    },
  },
}