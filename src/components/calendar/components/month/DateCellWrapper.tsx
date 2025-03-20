import {DateCellWrapperProps} from "react-big-calendar";
import {isToday} from "date-fns";
import {useMemo} from "react";
import {useCalendarStore} from "@/components/calendar/store/useCalendarStore";
import {motion} from "motion/react";
import {clsx} from "clsx";

export default function DateCellWrapper({value}: DateCellWrapperProps) {
  const {date} = useCalendarStore()

  const isDateToday = useMemo(() => isToday(value), [value])

  const isCurrentDateToday = useMemo(() => isToday(date), [date])

  return (
    <div className={clsx("rbc-day-bg relative", isDateToday && isCurrentDateToday && 'z-10')}>
      {isDateToday && isCurrentDateToday && (
        <motion.div layout="position" layoutId="today-indicator" className="flex justify-center items-center h-full absolute left-1/2 -translate-x-1/2 top-0">
          <div className="bg-primary rounded-full w-9 h-9 text-primary-foreground flex justify-center items-center">
            {value.getDate()}
          </div>
        </motion.div>
      )}
    </div>
  )
}
