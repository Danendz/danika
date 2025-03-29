import {StarIcon} from "lucide-react";
import {format, differenceInCalendarDays} from "date-fns";
import {useCalendarStore} from "@/components/calendar/store/useCalendarStore";
import {EventCardProps} from "@/modules/calendar/event-card/types";
import UserLine from "@/modules/calendar/event-card/UserLine";

export default function CountdownCard({data: {name, from: when, user}}: EventCardProps) {
  const {date} = useCalendarStore()
  const difference = differenceInCalendarDays(when, date)

  return (
    <div className="flex flex-col gap-1">
      <div className="flex justify-between items-center">
        <div>
          <div className="font-medium">{name}</div>
          <UserLine user={user} />
          <div className="flex items-center gap-1 text-sm text-secondary-foreground opacity-80">
            <StarIcon size={10} className="text-violet-500 fill-violet-500"/>
            <span>Countdown | {format(when, 'LLL d, yyyy')}</span>
          </div>
        </div>
        <div>
          {difference === 0 ? <span className="font-medium text-lg">Today!</span> :
            <span className="flex items-center gap-1">
              <span className="text-lg font-medium">{difference}</span> <span className="text-sm text-secondary-foreground/80">{difference > 1 ? 'days' : 'day'} left</span>
            </span>}
        </div>
      </div>
    </div>
  )
}
