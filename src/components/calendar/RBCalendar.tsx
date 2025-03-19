"use client"
import {Calendar, CalendarProps, Components, View, Views} from "react-big-calendar";
import NoSSR from "@/components/no-ssr/NoSSR";
import {calendarConfig} from "@/components/calendar/config";
import {useCallback, useMemo, useState} from "react";
import Toolbar from "@/components/calendar/components/toolbar/Toolbar";

import 'react-big-calendar/lib/css/react-big-calendar.css'
import './styles/CalendarOverrides.scss'
import DateCellWrapper from "@/components/calendar/components/month/DateCellWrapper";
import {getFixedWeeksForMonth} from "@/components/calendar/utils";
import {clsx} from "clsx";

export const RBCalendar = (props: Omit<CalendarProps, keyof typeof calendarConfig>) => {
  const [view, setView] = useState<View>(Views.MONTH)
  const [date, setDate] = useState(new Date())

  const onView = useCallback((view: View) => setView(view), [setView])
  const onDate = useCallback((date: Date) => setDate(date), [setDate])

  const weeks = useMemo(() => {
    return getFixedWeeksForMonth(new Date())
  },[])

  const components = useMemo<Components>(() => {
    return {
      toolbar: Toolbar,
      dateCellWrapper: DateCellWrapper
    }
  }, [])

  return (
    <NoSSR>
      <div className="custom-rb-calendar-wrapper">
        <div className="flex w-full h-full">
          <div className="rbc-weeks-numbers">
            {weeks.map(({weekNumber, currentWeek}) => (
              <div key={weekNumber} className={clsx("rbc-weeks-numbers__number", currentWeek && 'rbc-weeks-numbers__number_current')}>{weekNumber}</div>
            ))}
          </div>
          <div className="w-full">
            <Calendar
              {...calendarConfig}
              {...props}
              components={components}
              defaultView={view}
              view={view}
              date={date}
              onView={onView}
              onNavigate={onDate}
              className="custom-rb-calendar"
            />
          </div>
        </div>
      </div>
    </NoSSR>
  )
}