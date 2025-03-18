import {dateFnsLocalizer} from "react-big-calendar";
import {enUS} from "date-fns/locale";
import {format, parse, startOfWeek, getDay} from 'date-fns'

const locales = {
  'en-US': enUS
}

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales
})

export const calendarConfig = {
  localizer
}