import {ReactNode} from "react";
import {clsx} from "clsx";
import {motion, useAnimation} from "motion/react";

export default function DateTitle({children, index}: {children: ReactNode, index: number}) {
  const controls = useAnimation()
  return (
    <motion.div
      animate={controls}
      style={{y: index}}
      className={clsx('text-xl text-center', index === 1 && 'text-primary')}
    >
      {children}
    </motion.div>
  )
}