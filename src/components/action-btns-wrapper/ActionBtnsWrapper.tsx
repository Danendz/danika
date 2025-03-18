import {ReactNode} from "react";

export default function ActionBtnsWrapper({children}: {children: ReactNode}) {
  return (
    <div className="fixed primary-px right-0 mobile-nav-offset-b flex gap-3">
      {children}
    </div>
  )
}