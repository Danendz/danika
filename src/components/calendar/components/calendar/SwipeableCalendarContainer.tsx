"use client"
import {memo, useRef} from "react";
import {useCalendarStore} from "@/components/calendar/store/useCalendarStore";
import SwipeableContainer from '@/components/shared/swipeable-container/SwipeableContainer'
import { RBCalendar } from "./RBCalendar";
import {RBCalendarMock} from "@/components/calendar/components/calendar/RBCalendarMock";
import {
  SwipeableDataType,
  SwipeableInitialDataType,
  SwipeableReducerAction
} from "@/components/shared/swipeable-container/types";
import {startOfMonth} from "date-fns";

const datesReducer = (state: SwipeableDataType<Date>, action: SwipeableReducerAction) => {
  switch (action.type) {
    case 'ADD_NEXT_ITEM':
      const nextDate = new Date(state.next[state.next.length - 1])
      nextDate.setMonth(nextDate.getMonth() + 1)

      return {
        prev: state.prev,
        next: [...state.next, nextDate]
      }
    case 'ADD_PREV_ITEM':
      const prevDate = new Date(state.prev[state.prev.length - 1])
      prevDate.setMonth(prevDate.getMonth() - 1)

      return {
        next: state.next,
        prev: [...state.prev, prevDate]
      }
  }
}

const getInitialData = (currentDate: Date): SwipeableInitialDataType<Date> => {
  const prevDate = new Date(currentDate)
  const nextDate = new Date(currentDate)

  prevDate.setDate(1)
  nextDate.setDate(1)
  prevDate.setMonth(prevDate.getMonth() - 1)
  nextDate.setMonth(nextDate.getMonth() + 1)

  return {
    prev: [prevDate],
    next: [currentDate, nextDate]
  }
}

export const SwipeableCalendarContainer = () => {
  const { date, setDate, calendarIndex, setCalendarIndex} = useCalendarStore()
  const initialData = useRef(getInitialData(date))

  const onDateChange = (currentIndex: number, currentItem: Date) => {
    setDate(currentIndex === 0 ? currentItem : startOfMonth(currentItem))
    setCalendarIndex(currentIndex)
  }

  const getUniqueKey = (value: Date) => {
      return value.getTime()
  }

  const CurrentComponent = memo(function CurrentComponent(){
    return (
      <RBCalendar />
    )
  })

  const MockComponent = memo(function MockComponent({swipeableItem}: {swipeableItem: Date}) {
    return (
      <RBCalendarMock date={swipeableItem} />
    )
  })

  return (
    <SwipeableContainer
      onChange={onDateChange}
      CurrentComponent={CurrentComponent}
      MockComponent={MockComponent}
      dragThreshold={150}
      getUniqueIterationKey={getUniqueKey}
      initial={initialData.current}
      reducerFunc={datesReducer}
      currentIndex={calendarIndex}
    />
  )
}
