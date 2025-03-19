import {DateCellWrapperProps} from "react-big-calendar";
import {isToday} from "date-fns";
import {useMemo} from "react";

export default function DateCellWrapper({value}: DateCellWrapperProps) {
  const isDateToday = useMemo(() => isToday(value), [value])

  return (
    <div className="rbc-day-bg">
      {isDateToday && (
        <div className="flex justify-center items-center h-full">
          <div className="bg-primary rounded-full w-10 h-10">
          </div>
        </div>
      )}
    </div>
  )
}
