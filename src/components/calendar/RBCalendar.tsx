"use client"
import {Calendar, CalendarProps} from "react-big-calendar";
import 'react-big-calendar/lib/css/react-big-calendar.css'
import NoSSR from "@/components/no-ssr/NoSSR";
import {calendarConfig} from "@/components/calendar/config";

export const RBCalendar = (props: Omit<CalendarProps, keyof typeof calendarConfig>) => {
  return (
    <NoSSR>
      <Calendar
        {...calendarConfig}
        {...props}
      />
    </NoSSR>
  )
}