import { createTRPCRouter } from '../init';
import {userRouter} from "@/trpc/routers/user";
import {fileRouter} from "@/trpc/routers/file";
export const appRouter = createTRPCRouter({
  file: fileRouter,
  user: userRouter,
});
// export type definition of API
export type AppRouter = typeof appRouter;