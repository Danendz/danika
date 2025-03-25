import {EventRepeat} from "@prisma/client";
import DrawerDialog from "@/components/dialog/DrawerDialog";
import {DrawerContent, DrawerFooter, DrawerHeader, DrawerTitle} from "@/components/ui/drawer";
import {Button} from "@/components/ui/button";
import {EventData} from "@/modules/calendar/types";
import {useEffect, useState} from "react";
import {getRepeatNameByValue, getRepeatValuesByType} from "@/modules/calendar/utils";
import {clsx} from "clsx";
import {CheckIcon} from "lucide-react";

interface Props {
  isDialogVisible: boolean,
  setIsDialogVisible: (value: boolean) => void
  value: EventRepeat
  onChange: (value: EventRepeat) => void
  date: Date
  type: EventData['type']
}

export default function RepeatChooseDialog({isDialogVisible, setIsDialogVisible, value, onChange, date, type}: Props) {
  const [repeat, setRepeat] = useState(value)

  const repeatValues = getRepeatValuesByType(type)

  const onSubmit = () => {
    onChange(repeat)
    setIsDialogVisible(false)
  }

  useEffect(() => {
    setRepeat(value)
  }, [isDialogVisible, setRepeat, value])

  return (
    <DrawerDialog isDialogVisible={isDialogVisible} setIsDialogVisible={setIsDialogVisible}>
      <DrawerContent className="h-[100vh]">
        <DrawerHeader>
          <DrawerTitle>Repeat</DrawerTitle>
        </DrawerHeader>
        <div>
          {repeatValues.map((value) => (
            <div className={clsx("px-4 py-4 flex items-center justify-between transition duration-200", value === repeat && 'bg-primary/40 text-primary')} key={value} onClick={() => setRepeat(value)}>
              {getRepeatNameByValue(value, date)} {value === repeat && <CheckIcon className="text-primary" />}
            </div>
          ))}
        </div>
        <DrawerFooter>
          <div className="flex gap-4">
            <Button className="flex-1" variant="secondary" onClick={() => setIsDialogVisible(false)}>Cancel</Button>
            <Button className="flex-1" onClick={() => onSubmit()}>OK</Button>
          </div>
        </DrawerFooter>
      </DrawerContent>
    </DrawerDialog>
  )
}