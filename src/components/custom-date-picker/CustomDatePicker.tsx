// import {Carousel, CarouselContent, CarouselItem} from "../ui/carousel";
import {DatePicker} from "../ui/DatePicker";
import {useEffect, useReducer} from "react";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";

interface Props {
  initial?: Date,
  onChange: (date: Date) => void
}

interface DateState {
  date: Date,
  hours: number,
  minutes: number
}

type Action = |
  {
    type: 'change-date',
    value: Date
  } |
  {
    type: 'change-hours',
    value: number
  } |
  {
    type: 'change-minutes',
    value: number
  }

const dateReducer = (state: DateState, action: Action) => {
  switch (action.type) {
    case 'change-date':
      return {
        ...state,
        date: action.value
      }
    case 'change-hours':
      return {
        ...state,
        hours: action.value
      }
    case 'change-minutes':
      return {
        ...state,
        minutes: action.value
      }
  }
}

const hours = new Array(24).fill(0).map((_, i) => i)
const minutes = new Array(60).fill(0).map((_, i) => i)
export default function CustomDatePicker({initial, onChange}: Props) {
  const [date, dispatchDate] = useReducer(dateReducer, (() => {
    if (initial) {
      return {
        date: initial,
        hours: initial.getHours(),
        minutes: initial.getMinutes()
      }
    }

    const now = new Date()

    return {
      date: now,
      hours: now.getHours(),
      minutes: now.getMinutes()
    }
  })())

  useEffect(() => {
    const d = new Date(date.date)
    d.setHours(date.hours)
    d.setMinutes(date.minutes)

    onChange(d)
  }, [date, onChange])

  return (
    <div className="flex gap-1">
      <div className="flex-1/2">
        <DatePicker date={date.date} setDate={(date) => dispatchDate({type: 'change-date', value: date})}/>
      </div>
      <div className="flex-1/12">
        <Select value={String(date.hours)}
                onValueChange={(value) => dispatchDate({type: 'change-hours', value: Number(value)})}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Hours"/>
          </SelectTrigger>
          <SelectContent className="max-h-[300px]">
            {hours.map((val) => (
              <SelectItem key={val} value={String(val)}>{String(val).padStart(2, '0')}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex-1/12">
        <Select value={String(date.minutes)}
                onValueChange={(value) => dispatchDate({type: 'change-minutes', value: Number(value)})}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Hours"/>
          </SelectTrigger>
          <SelectContent className="max-h-[300px]">
            {minutes.map((val) => (
              <SelectItem key={val} value={String(val)}>{String(val).padStart(2, '0')}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      {/*TODO: Carousel*/}
      {/*<div className="overflow-hidden">*/}
      {/*  <div className="flex flex-col max-w-[100px]">*/}
      {/*<Carousel opts={{loop: true}}>*/}
      {/*  <CarouselContent>*/}
      {/*    {hours.map((value) => (*/}
      {/*      <CarouselItem className="min-w-0 shrink-0 grow-0 basis-full pt-1 md:basis-1/2"*/}
      {/*                    key={value}>{value}</CarouselItem>*/}
      {/*    ))}*/}
      {/*  </CarouselContent>*/}
      {/*</Carousel>*/}
      {/*  </div>*/}
      {/*</div>*/}


    </div>
  )
}