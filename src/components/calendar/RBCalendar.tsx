"use client"
import {Calendar, CalendarProps, Components} from "react-big-calendar";
import NoSSR from "@/components/no-ssr/NoSSR";
import {calendarConfig} from "@/components/calendar/config";
import {TouchEvent, useCallback, useMemo, useState} from "react";
import Toolbar from "@/components/calendar/components/toolbar/Toolbar";

import 'react-big-calendar/lib/css/react-big-calendar.css'
import './styles/CalendarOverrides.scss'
import DateCellWrapper from "@/components/calendar/components/month/DateCellWrapper";
import {getFixedWeeksForMonth} from "@/components/calendar/utils";
import {clsx} from "clsx";
import {useCalendarStore} from "@/components/calendar/store/useCalendarStore";

export const RBCalendar = (props: Omit<CalendarProps, keyof typeof calendarConfig>) => {
  const {setDate, view, date} = useCalendarStore()
  const [dragOffset, setDragOffset] = useState(0)

  const onDate = useCallback((date: Date) => setDate(date), [setDate])

  const dates = useMemo(() => {
    const prevMonth = new Date(date)
    const nextMonth = new Date(date)

    prevMonth.setMonth(prevMonth.getDate() - 1)
    nextMonth.setMonth(nextMonth.getDate() - 1)

    return {
      prevMonth,
      nextMonth
    }
  }, [date])

  const weeks = useMemo(() => {
    return getFixedWeeksForMonth(new Date())
  }, [])

  const components = useMemo<Components>(() => {
    return {
      dateCellWrapper: DateCellWrapper
    }
  }, [])

  const onDragStart = (e: TouchEvent | undefined) => {
    console.log(e)
  }

  const onDrag = (e: TouchEvent | undefined) => {

    console.log(e)
  }

  const onDragEnd = (e: TouchEvent | undefined) => {

    console.log(e)
  }

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
            <div className="overflow-hidden relative w-full">
              <div
                className="flex w-full absolute top-0"
                onTouchStart={onDragStart}
                onTouchMove={onDrag}
                onTouchEnd={onDragEnd}
                style={{
                  left: `calc(${dragOffset}px)`, // Adjust position based on drag offset
                }}
              >
                <div className="w-full">
                  <Calendar
                    {...calendarConfig}
                    {...props}
                    components={components}
                    defaultView={view}
                    view={view}
                    date={date}
                    onView={() => {
                    }}
                    onNavigate={onDate}
                    toolbar={false}
                    className="custom-rb-calendar"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </NoSSR>
  )
}