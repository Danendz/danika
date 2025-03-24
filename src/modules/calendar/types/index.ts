import { Prisma } from "@prisma/client";

export type EventData = Pick<Prisma.EventCreateInput, 'name' | 'type' | 'all_day' | 'repeat'> & {
  from: Date,
  to: Date
}
