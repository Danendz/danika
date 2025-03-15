"use server"
import {authSchema} from "@/plugins/zod/auth";
import {prisma} from "@/plugins/prisma";
import {hashPassword} from "@/plugins/auth/utils";

export const createUser = async (formData: FormData) => {
  const registerData = {
    username: formData.get('username'),
    password: formData.get('password')
  }

  const {username, password} = await authSchema.parseAsync(registerData)

  const user = await prisma.user.findUnique({where: {username}})

  if (user) {
    throw new Error("user already exists with this username")
  }

  const hashedPass = await hashPassword(password)

  await prisma.user.create({
    data: {
      username,
      password: hashedPass,
      name: 'user'
    }
  })
}