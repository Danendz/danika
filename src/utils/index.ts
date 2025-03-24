import {format} from "date-fns";

export const resolveDateFull = (date: Date) => {
  return format(date, 'eee, LLL d, yyyy, HH:mm')
}