"use client";
import Card from "@/components/shared/card/Card";
import {trpc} from "@/trpc/client";
import {Skeleton} from "@/components/ui/skeleton";
import {EventData} from "@/modules/calendar/types";
import CountdownCard from "@/modules/calendar/event-card/CountdownCard";
import DefaultCard from "@/modules/calendar/event-card/DefaultCard";
import {useCalendarStore} from "@/components/calendar/store/useCalendarStore";
import {differenceInCalendarDays} from "date-fns";
import {useMemo} from "react";
import {isDateBetween} from "@/utils";
import {AnimatePresence} from "motion/react";
import EventCardAnimationLayout from "@/modules/calendar/event-card/EventCardAnimationLayout";

const eventsLoadingArray = new Array(3).fill(0)
export default function EventCard() {
  const {data, isLoading, isError} = trpc.event.listEvents.useQuery()
  const {date} = useCalendarStore()

  const events = useMemo(() => {
    if (!data) return []

    return data.filter((item) => {
      switch (item.type) {
        case 'DEFAULT':
          return isDateBetween(new Date(item.from), new Date(item.to), date)
        case 'COUNTDOWN':
          return differenceInCalendarDays(new Date(item.from), date) >= 0
      }
    })
  }, [data, date])

  if (isLoading) {
    return (
      <Card>
        <div className="flex flex-col gap-5">
          {eventsLoadingArray.map((_, i) => (
            <div key={i} className="flex flex-col gap-1">
              <Skeleton className="w-15 h-3"/>
              <Skeleton className="w-20 h-3"/>
            </div>
          ))}
        </div>
      </Card>
    )
  }

  if (isError || !data) {
    return (
      <Card>
        Unable to get your events :(
      </Card>
    )
  }

  if (!events.length) {
    return (
      <Card>
        No events!
      </Card>
    )
  }

  const getCardComponent = (type: EventData['type']) => {
    switch (type) {
      case 'COUNTDOWN':
        return CountdownCard
      case 'DEFAULT':
        return DefaultCard
    }
  }

  return (
    <Card>
      <div className="flex flex-col gap-5">
        <AnimatePresence>
          {events.map((data) => {
            const CardComponent = getCardComponent(data.type)
            return (
              <EventCardAnimationLayout key={data.id}>
                <div className="flex flex-col gap-1">
                  {<CardComponent data={data}/>}
                </div>
              </EventCardAnimationLayout>
            )
          })}
        </AnimatePresence>
      </div>
    </Card>
  )
}