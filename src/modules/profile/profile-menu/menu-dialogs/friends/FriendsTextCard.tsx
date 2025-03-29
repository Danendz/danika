import {ReactNode} from "react";

export default function FriendsTextCard ({children}: {children: ReactNode}) {
  return (
    <div className="bg-primary-foreground h-15 flex justify-center items-center rounded">
      {children}
    </div>
  )
}