import { motion } from "motion/react";
import {ReactNode} from "react";

export default function DateWrapper ({children}: {children: ReactNode}) {
  return (
    <motion.div
      drag="y"
      dragConstraints={{top: 0, bottom: 0}}
      className="flex gap-4 flex-col"
    >
      {children}
    </motion.div>
  )
}