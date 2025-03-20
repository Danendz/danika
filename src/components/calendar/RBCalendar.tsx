"use client"
import {Calendar, CalendarProps, Components} from "react-big-calendar";
import NoSSR from "@/components/no-ssr/NoSSR";
import {calendarConfig} from "@/components/calendar/config";
import {useCallback, useMemo } from "react";
import Toolbar from "@/components/calendar/components/toolbar/Toolbar";

import 'react-big-calendar/lib/css/react-big-calendar.css'
import './styles/CalendarOverrides.scss'
import DateCellWrapper from "@/components/calendar/components/month/DateCellWrapper";
import {getFixedWeeksForMonth} from "@/components/calendar/utils";
import {clsx} from "clsx";
import {useCalendarStore} from "@/components/calendar/store/useCalendarStore";

export const RBCalendar = (props: Omit<CalendarProps, keyof typeof calendarConfig>) => {
  const { setDate, view, date} = useCalendarStore()

  const onDate = useCallback((date: Date) => setDate(date), [setDate])

  const weeks = useMemo(() => {
    return getFixedWeeksForMonth(new Date())
  }, [])

  const components = useMemo<Components>(() => {
    return {
      dateCellWrapper: DateCellWrapper
    }
  }, [])

  return (
    <NoSSR>
      <div className="custom-rb-calendar-wrapper">
        <div className="w-full">
          <Toolbar />

          <div className="flex w-full h-full">
            <div className="rbc-weeks-numbers select-none">
              {weeks.map(({weekNumber, currentWeek}) => (
                <div key={weekNumber}
                     className={clsx("rbc-weeks-numbers__number", currentWeek && 'rbc-weeks-numbers__number_current')}>{weekNumber}</div>
              ))}
            </div>
              <Calendar
                {...calendarConfig}
                {...props}
                components={components}
                defaultView={view}
                view={view}
                date={date}
                onView={() => {}}
                onNavigate={onDate}
                toolbar={false}
                className="custom-rb-calendar"
              />
          </div>
        </div>
      </div>
    </NoSSR>
  )
}