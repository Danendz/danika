"use client";

import {View} from "react-big-calendar";
import {useMemo, useState} from "react";
import {format} from "date-fns";
import {
  EllipsisVertical,
} from "lucide-react";
import {clsx} from "clsx";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {dropDownMenuItems, visibleViews} from "@/components/calendar/components/toolbar/data";
import {AnimatePresence, motion} from "motion/react";
import {useCalendarStore} from "@/components/calendar/store/useCalendarStore";

export default function Toolbar() {
  const {setView, view, date} = useCalendarStore()
  const [showViews, setShowViews] = useState(false)

  const onViewChange = (view: View) => {
    setView(view)
    setShowViews(false)
  }

  const formatedDate = useMemo(() => {
    return format(date, 'yyyy LLL')
  }, [date])

  const CurrentViewIcon = useMemo(() => {
    return visibleViews.find((item) => item.value === view)!.Icon
  }, [view])

  return (
    <div className="rbc-custom-toolbar w-full pt-3 pb-4">
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


      <AnimatePresence>
        {showViews &&
            <motion.div
                initial={{opacity: 0, height: 0}}
                animate={{opacity: 1, height: 60}}
                exit={{opacity: 0, height: 0}}
                transition={{duration: 0.15}}
            >
                <div
                    className="flex justify-around pt-4"
                >
                  {visibleViews.map(({title, value, Icon}, i) => (
                    <motion.div
                      initial={{y: -20, opacity: 0}}
                      animate={{y: 0, opacity: 1}}
                      transition={{delay: 0.1 * (i * 0.5)}}
                      key={value}
                      className={clsx("flex flex-col gap-1 items-center select-none", value === view && 'text-primary')}
                      onClick={() => onViewChange(value)}>
                      <Icon size={20}/>
                      <div className="text-sm">{title}</div>
                    </motion.div>
                  ))}
                </div>
            </motion.div>
        }
      </AnimatePresence>
    </div>
  )
}