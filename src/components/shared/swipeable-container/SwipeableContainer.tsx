"use client"
import {FC, useEffect, useReducer, useRef} from "react";
import {motion, PanInfo, useMotionValue} from 'motion/react'
import {
  SwipeableDataType,
  SwipeableInitialDataType,
  SwipeableReducerAction
} from "@/components/shared/swipeable-container/types";

interface Props<T> {
  dragThreshold: number
  reducerFunc: (state: SwipeableDataType<T>, action: SwipeableReducerAction) => SwipeableDataType<T>
  initial: SwipeableInitialDataType<T>
  onChange: (currentIndex: number, currentItem: T) => void,
  getUniqueIterationKey: (value: T) => string | number,
  CurrentComponent: FC<{ swipeableItem: T }>
  MockComponent: FC<{ swipeableItem: T }>
  currentIndex: number
}

const itemTransition = {duration: 0.4}

export default function SwipeableContainer<T>(
  {
    dragThreshold,
    reducerFunc,
    initial,
    onChange,
    CurrentComponent,
    MockComponent,
    currentIndex,
    getUniqueIterationKey
  }: Props<T>) {
  const [items, dispatchItem] = useReducer(reducerFunc, initial)
  const dragX = useMotionValue(0)
  const swipeContainerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (currentIndex > items.next.length) {
      for (let i = 0; i <= (currentIndex - items.next.length) + 1; i++) {
        dispatchItem({type: 'ADD_NEXT_ITEM'})
      }
    } else if (currentIndex < 0 && Math.abs(currentIndex) > items.prev.length) {
      for (let i = 0; i <= (Math.abs(currentIndex) - items.next.length) + 1; i++) {
        dispatchItem({type: 'ADD_PREV_ITEM'})
      }
    }
  }, [currentIndex])

  const onDragEnd = (e: DragEvent, info: PanInfo) => {
    const x = dragX.get() + info.velocity.x
    let newIndex = currentIndex
    if (x <= -dragThreshold) {
      newIndex = currentIndex + 1

      if (newIndex + 1 >= items.next.length) {
        dispatchItem({type: 'ADD_NEXT_ITEM'})
      }
    } else if (x >= dragThreshold) {
      newIndex = currentIndex - 1

      if (newIndex < 0 && Math.abs(newIndex - 1) >= items.prev.length) {
        dispatchItem({type: 'ADD_PREV_ITEM'})
      }
    }

    if (newIndex === currentIndex) return

    let newItem
    if (newIndex >= 0) {
      newItem = items.next[newIndex]
    } else {
      newItem = items.prev[Math.abs(newIndex + 1)]
    }

    onChange(newIndex, newItem)
  }

  return (
    <div className="overflow-hidden relative w-full">
      <motion.div
        ref={swipeContainerRef}
        drag="x"
        dragConstraints={{
          left: 0,
          right: 0
        }}
        onDragEnd={onDragEnd}
        dragElastic={0.7}
        transition={itemTransition}
        dragMomentum={false}
        style={{
          x: dragX
        }}
        animate={{
          translateX: `${-currentIndex * 100}%`
        }}
        className="flex w-full relative top-0"
      >
        {items.prev.map((value, i) => {
          const itemId = Math.abs(currentIndex)
          // i + 1 because we don't have currentItem in prev array so we should compensate it
          const itemIndex = i + 1
          const transform = {transform: `translateX(-${itemIndex * 100}%)`}

          if (itemId === itemIndex) {
            return (
              <div className="w-full absolute shrink-0" style={transform} key={getUniqueIterationKey(value)}>
                <CurrentComponent swipeableItem={value}/>
              </div>
            )
          }

          return currentIndex <= 0 && (itemId + 1 === itemIndex || itemId - 1 === itemIndex) ? (
            <div className="w-full absolute shrink-0" style={transform} key={getUniqueIterationKey(value)}>
              <MockComponent swipeableItem={value}/>
            </div>
          ) : null
        })}

        {items.next.map((value, i) => {
          const transform = {transform: `translateX(${i * 100}%)`}
          if (currentIndex === i) {
            return (
              <div key={getUniqueIterationKey(value)} className="w-full shrink-0 absolute" style={transform}>
                <CurrentComponent swipeableItem={value}/>
              </div>
            )
          }

          return currentIndex + 1 === i || currentIndex - 1 === i ? (
            <div className="w-full shrink-0 absolute" style={transform} key={getUniqueIterationKey(value)}>
              <MockComponent swipeableItem={value}/>
            </div>
          ) : null
        })}
      </motion.div>
    </div>
  )
}
