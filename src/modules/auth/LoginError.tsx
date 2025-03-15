"use client"
import {useSearchParams} from "next/navigation";
import {clsx} from "clsx";

export const LoginError = () => {
  const searchParams = useSearchParams()

  return (
    <div className={clsx(searchParams.get('error') ? "flex" : 'hidden', 'bg-red-500 w-full text-white rounded p-1 text-center text-sm')}>
      Invalid credentials, please try again
    </div>
  )
}