import {CircleIcon} from "lucide-react";
import {EventCardProps} from "@/modules/calendar/event-card/types";
import UserLine from "@/modules/calendar/event-card/UserLine";

export default function DefaultCard({data: {all_day, name, user}}: EventCardProps) {
  return (
    <div className="flex flex-col gap-1">
      <div className="font-medium">{name}</div>
      <UserLine user={user} />
      <div className="flex items-center gap-1 text-sm text-secondary-foreground opacity-80">
        <CircleIcon size={10} className="text-violet-500 fill-violet-500"/> <span>{all_day ? 'All day' : 'Partial'}</span>
      </div>
    </div>
  )
}