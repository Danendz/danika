import {Drawer} from "@/components/ui/drawer";
import {ReactNode} from "react";

interface Props {
  isDialogVisible: boolean,
  setIsDialogVisible: (value: boolean) => void
  children: ReactNode
}

export default function DrawerDialog({isDialogVisible, setIsDialogVisible, children}: Props) {
  return (
    <Drawer open={isDialogVisible} onOpenChange={setIsDialogVisible}>
      {children}
    </Drawer>
  )
}