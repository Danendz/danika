import { View } from "react-big-calendar"
import {FC} from "react";
import {CalendarDaysIcon, CalendarMinus2Icon, CalendarRangeIcon, ListChecksIcon} from "lucide-react";

interface VisibleView {
  title: string,
  value: View,
  Icon: FC<Parameters<typeof CalendarDaysIcon>[number]>
}

export const visibleViews: VisibleView[] = [
  {
    title: 'Month',
    value: 'month',
    Icon: CalendarDaysIcon
  },
  {
    title: 'Week',
    value: 'week',
    Icon: CalendarRangeIcon
  },
  {
    title: 'Day',
    value: 'day',
    Icon: CalendarMinus2Icon
  },
  {
    title: 'Events',
    value: 'agenda',
    Icon: ListChecksIcon
  }
]

export const dropDownMenuItems = [
  {
    title: 'Search'
  },
  {
    title: 'Jump to date'
  },
  {
    title: 'Calculate date'
  },
  {
    title: 'Settings'
  },
  {
    title: 'Feedback'
  }
]