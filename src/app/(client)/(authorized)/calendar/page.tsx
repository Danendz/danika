import ActionBtnsWrapper from "@/components/action-btns-wrapper/ActionBtnsWrapper";
import EventCard from "@/modules/calendar/event-card/EventCard";
import NoteCard from "@/modules/calendar/NoteCard";
import {RBCalendarLayout} from "@/components/calendar/RBCalendarLayout";
import TodayActionBtn from "@/modules/calendar/TodayActionBtn";
import {LayoutGroup} from "motion/react";
import AddEventBtn from "@/modules/calendar/AddEventBtn";

export default function Page() {
  return (
    <div className="flex flex-col gap-3">
      <LayoutGroup>
        <RBCalendarLayout/>

        <EventCard/>
        <NoteCard/>

        <ActionBtnsWrapper>
          <TodayActionBtn/>
          <AddEventBtn />
        </ActionBtnsWrapper>
      </LayoutGroup>
    </div>
  )
}