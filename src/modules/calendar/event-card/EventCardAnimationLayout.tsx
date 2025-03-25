import {ReactNode} from "react";
import {motion, useIsPresent} from "motion/react";

interface Props {
  children: ReactNode,
}

export default function EventCardAnimationLayout ({children}: Props) {
  const isPresent = useIsPresent();
  return (
    <motion.div
      style={{position: isPresent ? 'static' : 'absolute'}}
      initial={{x: -40, opacity: 0}}
      animate={{x: 0, opacity: 1}}
      exit={{x: 40, opacity: 0}}
      transition={{duration: 0.2, }}
      layout="position"
    >
      {children}
    </motion.div>
  )
}