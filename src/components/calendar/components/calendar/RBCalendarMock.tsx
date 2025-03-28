"use client"
import {Calendar} from "react-big-calendar";
import {calendarConfig} from "@/components/calendar/config";

import 'react-big-calendar/lib/css/react-big-calendar.css'
import '../../styles/CalendarOverrides.scss'
import {useCalendarStore} from "@/components/calendar/store/useCalendarStore";

export const RBCalendarMock = ({date}: {date: Date}) => {
  const {view} = useCalendarStore()

  const onView = () => {}
  const onNavigate = () => {}

  return (
    <Calendar
      {...calendarConfig}
      defaultView={view}
      view={view}
      date={date}
      onView={onView}
      onNavigate={onNavigate}
      toolbar={false}
      className="custom-rb-calendar"
    />
  )
}
