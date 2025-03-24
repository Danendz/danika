"use client";

import {Button} from "@/components/ui/button";
import {PlusIcon, SquareCheckIcon, StarIcon} from "lucide-react";
import DrawerDialog from "@/components/dialog/DrawerDialog";
import {useEffect, useReducer, useState} from "react";
import {DrawerContent, DrawerFooter, DrawerHeader, DrawerTitle} from "@/components/ui/drawer";
import {clsx} from "clsx";
import CountdownForm from "@/modules/calendar/event-forms/CountdownForm";
import EventForm from "@/modules/calendar/event-forms/EventForm";
import {Input} from "@/components/ui/input";
import {EventData} from "@/modules/calendar/types";
import {trpc} from "@/trpc/client";
import {toast} from "sonner";

const events: { Icon: typeof SquareCheckIcon, value: EventData['type'], name: string }[] = [
  {
    Icon: SquareCheckIcon,
    value: 'DEFAULT',
    name: 'Event'
  },
  {
    Icon: StarIcon,
    value: 'COUNTDOWN',
    name: 'Countdown'
  }
]

type Action = |
  {
    type: 'set-name',
    value: string
  } |
  {
    type: 'set-event',
    value: Pick<EventData, 'from' | 'to' | 'all_day' | 'repeat'>
  } |
  {
    type: 'set-type',
    value: EventData['type']
  } |
  {
    type: 'set-default',
  }

const dataReducer = (state: EventData, action: Action) => {
  switch (action.type) {
    case 'set-name':
      return {...state, name: action.value}
    case 'set-event':
      return {...state, ...action.value}
    case 'set-default':
      return {...initData()}
    case 'set-type':
      return {...state, type: action.value}
  }
}

const initData = () => {
  return {
    name: '',
    repeat: 'ONE_TIME',
    type: 'DEFAULT',
    all_day: false,
    from: (() => {
      const d = new Date()
      d.setMinutes(0)
      return d
    })(),
    to: (() => {
      const d = new Date()
      d.setMinutes(0)
      d.setHours(d.getHours() + 1)
      return d
    })()
  } as EventData
}

export default function AddEventBtn() {
  const [data, dispatchData] = useReducer(dataReducer, initData())
  const [isAddEventVisible, setIsAddEventVisible] = useState(false)
  const trpcUtils = trpc.useUtils()
  const {isPending, mutateAsync} = trpc.eventRouter.createEvent.useMutation({
    onSuccess: () => {
      toast("Event successfully created")
    },
    onError: (e) => {
      toast(e.message)
    }
  })

  const changeEvent = (value: EventData['type']) => {
    dispatchData({type: 'set-type', value})
  }

  const eventFormComponent = () => {
    switch (data.type) {
      case 'DEFAULT':
        return <EventForm data={data} onChange={(data) => dispatchData({type: 'set-event', value: data})}/>
      case 'COUNTDOWN':
        return <CountdownForm/>
    }
  }

  useEffect(() => {
    if (isAddEventVisible) {
      dispatchData({type: 'set-default'})
    }
  }, [isAddEventVisible])

  const createEvent = async () => {
    await mutateAsync(data)
    void trpcUtils.eventRouter.listEvents.invalidate()
    setIsAddEventVisible(false)
  }

  return (
    <>
      <DrawerDialog isDialogVisible={isAddEventVisible} setIsDialogVisible={setIsAddEventVisible}>
        <DrawerContent className="h-screen">
          <DrawerHeader>
            <DrawerTitle className="text-3xl">{events.find(({value}) => value === data.type)?.name}</DrawerTitle>
          </DrawerHeader>
          <div className="px-4">
            <div className="flex justify-around items-center">
              {events.map(({value, Icon, name}) => (
                <div key={value} className={clsx("flex gap-2 items-center", data.type === value && "text-primary")}>
                  <Icon onClick={() => changeEvent(value)}/>
                  <span>{name}</span>
                </div>
              ))}
            </div>

            <div className="mt-5">
              <Input
                value={data.name}
                onChange={(e) => dispatchData({type: 'set-name', value: e.currentTarget.value})}
                placeholder="Event name"
                className="mb-6"
              />
              {eventFormComponent()}
            </div>
          </div>

          <DrawerFooter>
            <div className="flex gap-4">
              <Button className="flex-1" variant="secondary" onClick={() => setIsAddEventVisible(false)} disabled={isPending}>Cancel</Button>
              <Button className="flex-1" disabled={isPending} onClick={() => createEvent()}>Create</Button>
            </div>
          </DrawerFooter>
        </DrawerContent>
      </DrawerDialog>
      <Button className="rounded-full p-0 px-0" size={"bigIcon"} variant="icon"
              onClick={() => setIsAddEventVisible(true)}>
        <PlusIcon/>
      </Button>
    </>
  )
}