import { createTRPCRouter } from '../init';
import {userRouter} from "@/trpc/routers/user";
import {fileRouter} from "@/trpc/routers/file";
import {defaultAssetRouter} from "@/trpc/routers/default-asset";
export const appRouter = createTRPCRouter({
  file: fileRouter,
  user: userRouter,
  defaultAsset: defaultAssetRouter
});
// export type definition of API
export type AppRouter = typeof appRouter;