"use client"
import NoSSR from "@/components/shared/no-ssr/NoSSR";
import {useMemo} from "react";
import Toolbar from "@/components/calendar/components/toolbar/Toolbar";

import 'react-big-calendar/lib/css/react-big-calendar.css'
import './styles/CalendarOverrides.scss'
import {getFixedWeeksForMonth} from "@/components/calendar/utils";
import {clsx} from "clsx";
import {useCalendarStore} from "@/components/calendar/store/useCalendarStore";
import {SwipeableCalendarContainer} from "@/components/calendar/components/calendar/SwipeableCalendarContainer";

export const RBCalendarLayout = () => {
  const {date} = useCalendarStore()

  const weeks = useMemo(() => {
    return getFixedWeeksForMonth(date)
  }, [date])

  return (
    <NoSSR>
      <div className="custom-rb-calendar-wrapper">
        <div className="w-full">
          <Toolbar/>

          <div className="flex w-full h-full">
            <div className="rbc-weeks-numbers select-none">
              {weeks.map(({weekNumber, currentWeek}) => (
                <div key={weekNumber}
                     className={clsx("rbc-weeks-numbers__number", currentWeek && 'rbc-weeks-numbers__number_current')}>{weekNumber}</div>
              ))}
            </div>

            <SwipeableCalendarContainer />
          </div>
        </div>
      </div>
    </NoSSR>
  )
}