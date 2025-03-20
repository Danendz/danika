import {create} from "zustand/react";
import {View, Views} from "react-big-calendar";

interface CalendarStore {
  date: Date,
  view: View
  setDate: (newDate: Date) => void,
  setView: (newView: View) => void
}

export const useCalendarStore = create<CalendarStore>((set) => ({
  date: new Date(),
  view: Views.MONTH,
  setDate: (newDate: Date) => {
    set(() => ({date: newDate}))
  },
  setView: (newView: View) => {
    set(() => ({view: newView}))
  }
}))