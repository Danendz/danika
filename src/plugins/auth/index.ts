import NextAuth from "next-auth";
import { comparePasswords } from "./utils";
import {authSchema} from "@/plugins/zod/auth";
import {prisma} from "@/plugins/prisma";
import Credentials from "next-auth/providers/credentials";
export const {handlers, signIn, signOut, auth} = NextAuth({
  secret: process.env.AUTH_SECRET,
  providers: [
    Credentials({
      credentials: {
        username: {},
        password: {}
      },
      authorize: async (credentials) => {
        try {
          const {username, password} = await authSchema.parseAsync(credentials)

          const user = await prisma.user.findUnique({where: {username}})

          if (!user) {
            return null
          }

          const isPasswordValid = await comparePasswords(password, user.password)

          if (!isPasswordValid) {
            return null
          }

          return user
        } catch (error) {
          console.error(error)
          return null
        }
      },
    })
  ],
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60
  },
  pages: {
    signIn: '/login'
  }
})