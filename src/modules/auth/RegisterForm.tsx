"use client"

import {Input} from "@/components/ui/input"
import {Button} from "@/components/ui/button";
import {useState, useTransition} from "react";
import {ZodError} from "zod";
import {signIn} from "next-auth/react";
import {trpc} from "@/trpc/client";
import {useRouter} from "next/navigation";

export const RegisterForm = () => {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()
  const createUserMutation = trpc.user.createUser.useMutation()

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    if (!formData.get('username') || !formData.get('password')) {
      return
    }

    startTransition(async () => {
      setError(null)
      try {
        const registerData = {username: formData.get('username') as string, password: formData.get('password') as string}

        await createUserMutation.mutateAsync(registerData)
        await signIn('credentials', registerData)
        router.push('/')
      } catch (e) {
        if (e instanceof ZodError) {
          setError(e.errors.map((e) => e.message).join(', '))
        } else if(typeof e === 'object' && e && 'message' in e) {
          setError(e.message as string)
        } else {
          setError("Unknown error")
        }
      }
    })
  }
  return (
    <>
      {error && <div className={'bg-red-500 w-full text-white rounded p-1 text-center text-sm'}>
        {error}
      </div>}
      <form onSubmit={handleSubmit} className="flex flex-col gap-2 w-full">
        <Input placeholder="Username" name="username" type="text"/>
        <Input placeholder="Password" name="password" type="password"/>
        <Button disabled={isPending} type="submit">Register new account</Button>
      </form>
    </>
  )
}
