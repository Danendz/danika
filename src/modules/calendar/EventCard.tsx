import {StarIcon} from "lucide-react";
import Card from "@/components/card/Card";

export default function EventCard() {
  // TODO: Different components for different type of events
  const events = [
    {
      name: 'Nowruz',
      subname: 'All day',
      color: 'violet-500'
    },
    {
      name: "I'll meet my loved one",
      subname: 'Countdown | October 1, 2025',
      color: 'blue'
    }
  ]
  return (
    <Card>
      <div className="flex flex-col gap-5">
        {events.map(({name, subname}) => (
          <div key={name} className="flex flex-col gap-1">
            <div className="font-medium">{name}</div>
            <div className="flex items-center gap-1 text-sm text-secondary-foreground opacity-80">
              <StarIcon size={10} className="text-violet-500 fill-violet-500"/> {subname}
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}