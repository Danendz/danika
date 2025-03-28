export type SwipeableDataType<T> = {
  prev: T[],
  next: T[]
}

export type SwipeableInitialDataType<T> = {
  prev: [T],
  next: [T, T]
}

export type SwipeableReducerAction = |
  {
    type: 'ADD_NEXT_ITEM',
  } |
  {
    type: 'ADD_PREV_ITEM'
  }
