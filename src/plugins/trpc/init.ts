import {initTRPC, TRPCError} from '@trpc/server';
import {cache} from 'react';
import {auth} from "@/plugins/auth";
import {CreateNextContextOptions} from "@trpc/server/adapters/next";

export const createTRPCContext = cache(async ({ req, res }: CreateNextContextOptions) => {
  const session = await auth()
  return {req, res, session} as {session: { user: { name: string, id: string } } | null};
});

const t = initTRPC.context<{ session: { user: { name: string, id: string } } | null }>().create();

const isAuthed = t.middleware(({ctx, next}) => {
  if (!ctx.session || !ctx.session.user) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'You must be logged in to access this endpoint',
    });
  }

  return next({
    ctx: {session: ctx.session},
  });
})
// Base router and procedure helpers
export const createTRPCRouter = t.router;
export const createCallerFactory = t.createCallerFactory;
export const protectedProcedure = t.procedure.use(isAuthed);
