import { createTRPCRouter } from '../init';
import {userRouter} from "@/trpc/routers/user";
import {fileRouter} from "@/trpc/routers/file";
import {defaultAssetRouter} from "@/trpc/routers/default-asset";
import {friendRouter} from "@/trpc/routers/friend";
import {friendRequestRouter} from "@/trpc/routers/friend-request";
import {inferRouterOutputs} from "@trpc/server";
export const appRouter = createTRPCRouter({
  file: fileRouter,
  user: userRouter,
  defaultAsset: defaultAssetRouter,
  friend: friendRouter,
  friendRequest: friendRequestRouter
});
// export type definition of API
export type AppRouter = typeof appRouter;
export type RouterOutput = inferRouterOutputs<AppRouter>