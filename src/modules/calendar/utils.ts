import {EventRepeat} from '@prisma/client'
import {format} from "date-fns";
import {EventData} from "@/modules/calendar/types";
export const getRepeatNameByValue = (type: EventRepeat | undefined, date: Date) => {
  if (!type) {
    return 'No repeat'
  }

  const day = format(date, 'EEEE')
  switch (type) {
    case 'ONE_TIME':
      return 'One-time event'
    case 'DAILY':
      return 'Daily'
    case 'WEEKDAYS':
      return 'Weekdays (Mon-Fri)'
    case 'WEEKLY':
      return `Weekly (every ${day})`
    case 'MONTHLY':
      return `Monthly (fourth ${day})`
    case 'MONTHLY_SAME_DATE':
      return 'Monthly (same date)'
    case 'YEARLY':
      return `Yearly (every ${format(date, 'EEEE d')})`
  }
}

export const getRepeatValuesByType = (type: EventData['type']): EventRepeat[] => {
  switch (type) {
    case 'DEFAULT':
      return [
        'ONE_TIME',
        'DAILY',
        'WEEKDAYS',
        'WEEKLY',
        'MONTHLY',
        'MONTHLY_SAME_DATE',
        'YEARLY'
      ]
    case 'COUNTDOWN':
      return [
        'NEVER',
        'MONTHLY',
        'YEARLY'
      ]
  }
}