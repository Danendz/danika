import { createTRPCRouter } from '../init';
import {userRouter} from "@/plugins/trpc/routers/user";
export const appRouter = createTRPCRouter({
  user: userRouter
});
// export type definition of API
export type AppRouter = typeof appRouter;