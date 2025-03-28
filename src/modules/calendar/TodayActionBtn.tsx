"use client";

import {useCalendarStore} from "@/components/calendar/store/useCalendarStore";
import {useMemo} from "react";
import {isToday} from "date-fns";
import {motion} from "motion/react";

export default function TodayActionBtn() {
  const {date, setDate, setCalendarIndex} = useCalendarStore()
  const today = useMemo(() => new Date(), [])
  const isCurrentDateToday = useMemo(() => isToday(date), [date])

  const returnToToday = () => {
    setCalendarIndex(0)
    setDate(new Date())
  }

  return (
    <div className="relative size-12 cursor-pointer" onClick={() => returnToToday()}>
      {!isCurrentDateToday && (
        <motion.div layout="position" layoutId="today-indicator" className="flex justify-center items-center h-full z-20 absolute">
          <div className="flex justify-center items-center bg-primary rounded-full size-12 text-primary-foreground">
            {today.getDate()}
          </div>
        </motion.div>
      )}
    </div>
  )
}