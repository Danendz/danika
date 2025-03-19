import { Button } from "@/components/ui/button";
import {PlusIcon} from "lucide-react";
import ActionBtnsWrapper from "@/components/action-btns-wrapper/ActionBtnsWrapper";
import EventCard from "@/modules/calendar/EventCard";
import NoteCard from "@/modules/calendar/NoteCard";
import {RBCalendar} from "@/components/calendar/RBCalendar";

export default function Page() {
  return (
    <div className="flex flex-col gap-3">
      <RBCalendar/>

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