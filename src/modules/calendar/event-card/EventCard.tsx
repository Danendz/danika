"use client";
import Card from "@/components/card/Card";
import {trpc} from "@/trpc/client";
import {Skeleton} from "@/components/ui/skeleton";
import {EventData} from "@/modules/calendar/types";
import CountdownCard from "@/modules/calendar/event-card/CountdownCard";
import DefaultCard from "@/modules/calendar/event-card/DefaultCard";

const eventsLoadingArray = new Array(3).fill(0)
export default function EventCard() {
  const {data, isLoading, isError} = trpc.eventRouter.listEvents.useQuery()

  if (isLoading) {
    return (
      <Card>
        <div className="flex flex-col gap-5">
          {eventsLoadingArray.map((_, i) => (
            <div key={i} className="flex flex-col gap-1">
              <Skeleton className="w-15 h-3" />
              <Skeleton className="w-20 h-3" />
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

  if (!data.length) {
    return (
      <Card>
        No events!
      </Card>
    )
  }

  const getCardByType = (type: EventData['type'], props: Omit<typeof data[number], 'id' | 'type'>) => {
    switch (type) {
      case 'COUNTDOWN':
        return <CountdownCard name={props.name} when={new Date(props.from)} />
      case 'DEFAULT':
        return <DefaultCard name={props.name} all_day={props.all_day} />
    }
  }

  return (
    <Card>
      <div className="flex flex-col gap-5">
        {data.map(({id, name, type, ...rest}) => (
          <div key={id} className="flex flex-col gap-1">
            {getCardByType(type, {...rest, name})}
          </div>
        ))}
      </div>
    </Card>
  )
}