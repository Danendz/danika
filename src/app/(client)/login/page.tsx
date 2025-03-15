import {LoginForm} from "@/modules/auth/LoginForm";

export default function Page() {
  return (
    <div className="flex h-screen justify-center items-center ">
      <div className="flex flex-col gap-2 max-w-[240px] justify-center items-center">
        <h1>Danika</h1>
        <LoginForm />
      </div>
    </div>
  )
}