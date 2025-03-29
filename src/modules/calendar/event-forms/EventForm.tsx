import {Switch} from "@/components/ui/switch";
import {useEffect, useState} from "react";
import {resolveDateFull} from "@/utils";
import DatePickerDialog from "@/components/shared/custom-date-picker/DatePickerDialog";
import {EventData} from "@/modules/calendar/types";
import {getRepeatNameByValue} from "@/modules/calendar/utils";
import RepeatChooseDialog from "@/modules/calendar/event-forms/components/RepeatChooseDialog";
import {EventRepeat} from "@prisma/client";

interface Props {
  data: EventData
  onChange: (data: Pick<EventData, 'from' | 'to' | 'all_day' | 'repeat'>) => void
}

export default function EventForm({data, onChange}: Props) {
  const [dateFromPickerVisible, setDateFromPickerVisible] = useState(false)
  const [dateToPickerVisible, setDateToPickerVisible] = useState(false)
  const [isRepeatDialogVisible, setIsRepeatDialogVisible] = useState(false)

  const [allDay, setAllDay] = useState(data.all_day)
  const [includeEndDate, setIncludeEndDate] = useState(true)
  const [repeat, setRepeat] = useState(data.repeat as EventRepeat)

  const [fromDate, setFromDate] = useState(data.from as Date)

  const [toDate, setToDate] = useState(data.to as Date)

  useEffect(() => {
    onChange({
      from: fromDate,
      to: includeEndDate ? toDate : null,
      all_day: allDay,
      repeat: repeat
    })
  }, [fromDate, toDate, allDay, repeat, onChange, includeEndDate]);

  return (
    <div className="flex flex-col gap-6">
      <DatePickerDialog
        initial={fromDate}
        onSubmit={setFromDate}
        isDialogVisible={dateFromPickerVisible}
        setIsDialogVisible={setDateFromPickerVisible}
        title="From"
      />

      {toDate && <DatePickerDialog
        initial={toDate}
        onSubmit={setToDate}
        isDialogVisible={dateToPickerVisible}
        setIsDialogVisible={setDateToPickerVisible}
        title="To"
      />}

      <RepeatChooseDialog
        isDialogVisible={isRepeatDialogVisible}
        setIsDialogVisible={setIsRepeatDialogVisible}
        value={repeat}
        onChange={setRepeat}
        date={fromDate}
        type={data.type}
      />
      <div className="flex justify-between items-center">
        All day <Switch checked={allDay} onCheckedChange={(e) => setAllDay(e)}/>
      </div>
      <div className="flex justify-between items-center cursor-pointer" onClick={() => setDateFromPickerVisible(true)}>
        <span>From </span> {resolveDateFull(fromDate)}
      </div>
      <div className="flex justify-between items-center">
        Include end date <Switch checked={includeEndDate} onCheckedChange={(e) => setIncludeEndDate(e)}/>
      </div>
      {toDate && <div className="flex justify-between items-center cursor-pointer" onClick={() => setDateToPickerVisible(true)}>
        <span>To </span> {resolveDateFull(toDate)}
      </div>}
      <div className="flex justify-between items-center cursor-pointer" onClick={() => setIsRepeatDialogVisible(true)}>
        <span>Repeat </span> {getRepeatNameByValue(repeat, fromDate)}
      </div>
    </div>
  )
}