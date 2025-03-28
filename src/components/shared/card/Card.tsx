import {ReactNode} from "react";

export default function Card({children}: { children: ReactNode }) {
  return (
    <div className="w-full h-full primary-px">
      <div className="bg-primary-foreground rounded py-3 px-3">
        {children}
      </div>
    </div>
  )
}