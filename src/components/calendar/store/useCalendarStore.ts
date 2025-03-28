import {create} from "zustand/react";
import {View, Views} from "react-big-calendar";

interface CalendarStore {
  date: Date,
  view: View
  calendarIndex: number
  setDate: (newDate: Date) => void,
  setView: (newView: View) => void,
  setCalendarIndex: (value: number) => void
}

export const useCalendarStore = create<CalendarStore>((set) => ({
  date: new Date(),
  view: Views.MONTH,
  calendarIndex: 0,
  setDate: (newDate: Date) => {
    set(() => ({date: newDate}))
  },
  setView: (newView: View) => {
    set(() => ({view: newView}))
  },
  setCalendarIndex: (value: number) => {
    set(() => ({calendarIndex: value}))
  }
}))