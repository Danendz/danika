import {format, isWithinInterval, startOfDay} from "date-fns";

export const resolveDateFull = (date: Date) => {
  return format(date, 'eee, LLL d, yyyy, HH:mm')
}

export const isDateBetween = (dateFrom: Date, dateTo: Date, currentDate: Date) => {
   const dateWithoutTime = startOfDay(currentDate);
  const startWithoutTime = startOfDay(dateFrom);
  const endWithoutTime = startOfDay(dateTo);
  return isWithinInterval(dateWithoutTime, {start: startWithoutTime, end: endWithoutTime})
}