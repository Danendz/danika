import Card from "@/components/shared/card/Card";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Separator} from "@/components/ui/separator";
import {InfoIcon} from "lucide-react";

const notes = [
  {
    title: 'Tea',
    time: '08:06 AM'
  },
  {
    title: 'Balbeska',
    time: '06:26 AM'
  },
]

export default function NoteCard() {
  return (
    <Card>
      <div className="flex items-center justify-between">
        <span>Notes</span>
        <Button variant="secondaryBadge" size="xsmNoIcon">View all</Button>
      </div>
      <div className="pt-3">
        <Input className="dark:bg-input/0 border-0" placeholder="Tap to add a task"/>
        <Separator/>
        <div className="flex flex-col gap-5 pt-3">
          {notes.map(({title, time}) => (
            <div key={title} className="flex justify-between items-center">
              <div className="flex flex-col">
                <span>{title}</span>
                <span className="text-sm opacity-80">{time}</span>
              </div>
              <div>
                <InfoIcon className="text-primary" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  )
}