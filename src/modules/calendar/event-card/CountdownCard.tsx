import {StarIcon} from "lucide-react";
import {format} from "date-fns";

interface Props {
  name: string,
  when: Date
}

export default function CountdownCard({name, when}: Props) {
  return (
    <>
      <div className="font-medium">{name}</div>
      <div className="flex items-center gap-1 text-sm text-secondary-foreground opacity-80">
        <StarIcon size={10} className="text-violet-500 fill-violet-500"/>
        <span>Countdown | {format(when, 'LLL d, yyyy')}</span>
      </div>
    </>
  )
}
