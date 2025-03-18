import { RBCalendarLoading } from "@/components/calendar/RBCalendarLoading";
import { Button } from "@/components/ui/button";
import {PlusIcon} from "lucide-react";
import dynamic from "next/dynamic";
import ActionBtnsWrapper from "@/components/action-btns-wrapper/ActionBtnsWrapper";
import EventCard from "@/modules/calendar/EventCard";
import NoteCard from "@/modules/calendar/NoteCard";

// TODO: Somehow show skeleton while calendar loads
const DynamicRBCalendar = dynamic(() => import('@/components/calendar/RBCalendar').then((mod) => mod.RBCalendar), {
  loading: () => <RBCalendarLoading />,
})

export default function Page() {
  return (
    <div className="flex flex-col gap-3">
      <div className="h-[60vh]">
        <DynamicRBCalendar />
      </div>

      <EventCard />
      <NoteCard />

      <ActionBtnsWrapper>
        <Button className="rounded-full p-0 px-0" size={"icon"} variant="icon">
          <PlusIcon/>
        </Button>
      </ActionBtnsWrapper>
    </div>
  )
}