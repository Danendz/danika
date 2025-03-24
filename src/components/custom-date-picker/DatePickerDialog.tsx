import DrawerDialog from "@/components/dialog/DrawerDialog";
import {DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle} from "@/components/ui/drawer";
import CustomDatePicker from "@/components/custom-date-picker/CustomDatePicker";
import { Button } from "../ui/button";
import {useEffect, useState} from "react";
import {resolveDateFull} from "@/utils";

interface Props{
  initial: Date,
  onSubmit: (date: Date) => void,
  isDialogVisible: boolean,
  setIsDialogVisible: (value: boolean) => void,
  title: string
}

export default function DatePickerDialog({initial, onSubmit,  isDialogVisible, setIsDialogVisible, title}: Props) {
  const [date, setDate] = useState(initial)

  useEffect(() => {
    setDate(initial)
  }, [initial])

  const onSubmitLocal = () => {
    onSubmit(date)
    setIsDialogVisible(false)
  }

  return (
    <DrawerDialog isDialogVisible={isDialogVisible} setIsDialogVisible={setIsDialogVisible}>
    <DrawerContent className="h-[40vh] max-w-[600px]">
      <DrawerHeader>
        <DrawerTitle>{title}</DrawerTitle>
        <DrawerDescription>{resolveDateFull(date)}</DrawerDescription>
      </DrawerHeader>
      <div className="px-4">
        <CustomDatePicker initial={date} onChange={setDate} />
      </div>
      <DrawerFooter>
        <div className="flex gap-4">
          <Button className="flex-1" variant="secondary" onClick={() => setIsDialogVisible(false)}>Cancel</Button>
          <Button className="flex-1" onClick={() => onSubmitLocal()}>OK</Button>
        </div>
      </DrawerFooter>
    </DrawerContent>
  </DrawerDialog>
  )
}