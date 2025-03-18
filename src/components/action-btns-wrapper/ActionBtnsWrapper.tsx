import {ReactNode} from "react";

export default function ActionBtnsWrapper({children}: {children: ReactNode}) {
  return (
    <div className="fixed primary-px mobile-nav-offset-b flex gap-3 container justify-end">
      {children}
    </div>
  )
}