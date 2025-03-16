import {RegisterForm} from "@/modules/auth/RegisterForm";

export default function Page() {
  return (
    <div className="flex h-screen justify-center items-center ">
      <div className="flex flex-col gap-2 max-w-[240px] justify-center items-center">
        <h1>Danika</h1>
        <RegisterForm />
      </div>
    </div>
  )
}