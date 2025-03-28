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

export default function CountdownForm({data, onChange}: Props) {
  const [dateFromPickerVisible, setDateFromPickerVisible] = useState(false)
  const [isRepeatDialogVisible, setIsRepeatDialogVisible] = useState(false)

  const [repeat, setRepeat] = useState(data.repeat as EventRepeat)

  const [fromDate, setFromDate] = useState(data.from as Date)

  useEffect(() => {
    onChange({
      from: fromDate,
      to: fromDate,
      all_day: data.all_day,
      repeat: repeat
    })
  }, [fromDate, repeat, onChange, data.all_day]);

  return (
    <div className="flex flex-col gap-6">
      <DatePickerDialog
        initial={fromDate}
        onSubmit={setFromDate}
        isDialogVisible={dateFromPickerVisible}
        setIsDialogVisible={setDateFromPickerVisible}
        title="From"
      />

      <RepeatChooseDialog
        isDialogVisible={isRepeatDialogVisible}
        setIsDialogVisible={setIsRepeatDialogVisible}
        value={repeat}
        onChange={setRepeat}
        date={fromDate}
        type={data.type}
      />
      <div className="flex justify-between items-center" onClick={() => setDateFromPickerVisible(true)}>
        <span>When </span> {resolveDateFull(fromDate)}
      </div>
      <div className="flex justify-between items-center" onClick={() => setIsRepeatDialogVisible(true)}>
        <span>Repeat </span> {getRepeatNameByValue(repeat, fromDate)}
      </div>
    </div>
  )
}
