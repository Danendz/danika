"use client";

import {ToolbarProps, View} from "react-big-calendar";
import {useMemo, useState} from "react";
import {format} from "date-fns";
import {
  EllipsisVertical,
} from "lucide-react";
import {clsx} from "clsx";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {dropDownMenuItems, visibleViews} from "@/components/calendar/components/toolbar/data";

export default function Toolbar({onView, date, view}: ToolbarProps) {
  const [showViews, setShowViews] = useState(false)

  const onViewChange = (view: View) => {
    onView(view)
    setShowViews(false)
  }

  const formatedDate = useMemo(() => {
    return format(date, 'yyyy LLL')
  }, [date])

  const CurrentViewIcon = useMemo(() => {
    return visibleViews.find((item) => item.value === view)!.Icon
  }, [view])

  return (
    <div className={clsx("rbc-custom-toolbar w-full pt-3 pb-4", showViews && 'rbc-toolbar-views-showed')}>
      <div className="flex justify-between items-center primary-px">
        <div className="font-bold text-xl">{formatedDate}</div>
        <div className="flex gap-4">
          <div><CurrentViewIcon onClick={() => setShowViews((prevState) => !prevState)}/></div>
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger className="outline-0"><EllipsisVertical/></DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {dropDownMenuItems.map(({title}) => (
                <DropdownMenuItem className="py-4 px-8" key={title}>{title}</DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {showViews && (
        <div className="flex justify-around pt-4">
          {visibleViews.map(({title, value, Icon}) => (
            <div key={value} className={clsx("flex flex-col gap-1 items-center", value === view && 'text-primary')} onClick={() => onViewChange(value)}>
              <Icon size={20} />
              <div className="text-sm">{title}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}