import {CircleIcon} from "lucide-react";

interface Props {
  name: string,
  all_day: boolean
}
export default function DefaultCard({name, all_day}: Props) {
  return (
    <>
      <div className="font-medium">{name}</div>
      <div className="flex items-center gap-1 text-sm text-secondary-foreground opacity-80">
        <CircleIcon size={10} className="text-violet-500 fill-violet-500"/> <span>{all_day ? 'All day' : 'Partial'}</span>
      </div>
    </>
  )
}