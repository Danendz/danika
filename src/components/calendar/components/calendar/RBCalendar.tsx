"use client"
import {Calendar, CalendarProps, Components} from "react-big-calendar";
import {calendarConfig} from "@/components/calendar/config";
import {useCallback, useMemo} from "react";

import 'react-big-calendar/lib/css/react-big-calendar.css'
import '../../styles/CalendarOverrides.scss'
import {useCalendarStore} from "@/components/calendar/store/useCalendarStore";
import DateCellWrapper from "@/components/calendar/components/month/DateCellWrapper";

export const RBCalendar = (props: Omit<CalendarProps, keyof typeof calendarConfig>) => {
  const {setDate, view, date} = useCalendarStore()

  const onDate = useCallback((date: Date) => setDate(date), [setDate])

  const components = useMemo<Components>(() => {
    return {
      dateCellWrapper: DateCellWrapper
    }
  }, [])

  return (
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
  )
}
