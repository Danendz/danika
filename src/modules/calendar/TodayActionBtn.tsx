"use client";

import {useCalendarStore} from "@/components/calendar/store/useCalendarStore";
import {useMemo} from "react";
import {isToday} from "date-fns";
import {motion} from "motion/react";

export default function TodayActionBtn() {
  const {date, setDate} = useCalendarStore()
  const today = useMemo(() => new Date(), [])
  const isCurrentDateToday = useMemo(() => isToday(date), [date])

  return (
    <div className="relative w-9 h-9 cursor-pointer" onClick={() => setDate(new Date())}>
      {!isCurrentDateToday && (
        <motion.div layout="position" layoutId="today-indicator" className="flex justify-center items-center h-full z-20 absolute">
          <div className="flex justify-center items-center bg-primary rounded-full w-9 h-9 text-primary-foreground">
            {today.getDate()}
          </div>
        </motion.div>
      )}
    </div>
  )
}