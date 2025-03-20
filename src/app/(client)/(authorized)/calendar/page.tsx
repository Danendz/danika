import {Button} from "@/components/ui/button";
import {PlusIcon} from "lucide-react";
import ActionBtnsWrapper from "@/components/action-btns-wrapper/ActionBtnsWrapper";
import EventCard from "@/modules/calendar/EventCard";
import NoteCard from "@/modules/calendar/NoteCard";
import {RBCalendar} from "@/components/calendar/RBCalendar";
import TodayActionBtn from "@/modules/calendar/TodayActionBtn";
import {LayoutGroup} from "motion/react";

export default function Page() {
  return (
    <div className="flex flex-col gap-3">
      <LayoutGroup>
        <RBCalendar/>

        <EventCard/>
        <NoteCard/>

        <ActionBtnsWrapper>
          <TodayActionBtn/>
          <Button className="rounded-full p-0 px-0" size={"icon"} variant="icon">
            <PlusIcon/>
          </Button>
        </ActionBtnsWrapper>
      </LayoutGroup>
    </div>
  )
}