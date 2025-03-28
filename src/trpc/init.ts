import {initTRPC, TRPCError} from '@trpc/server';
import {cache} from 'react';
import {auth} from "@/plugins/auth";

export const createTRPCContext = cache(async () => {
  const session = await auth()

  return {session: session} as { session: { user: { name: string, id: string } } | null };
});

type Context = {
  session: {
    user: { name: string, id: string }
  } | null ,
}

const t = initTRPC.context<Context>().create();

const isAuthed = t.middleware(async ({ctx, next}) => {
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


export const publicProcedure = t.procedure
export const protectedProcedure = t.procedure.use(isAuthed);