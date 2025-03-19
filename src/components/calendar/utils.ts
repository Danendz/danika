import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addWeeks,
  getWeek,
  isWithinInterval
} from 'date-fns';

/**
 * Функция возвращает массив из 6 объектов,
 * каждый объект содержит начало недели, конец недели и номер недели.
 */
export function getFixedWeeksForMonth(date: Date) {
  const monthStart = startOfMonth(date);
  const monthEnd = endOfMonth(date);

  const calendarStart = startOfWeek(monthStart);
  const calendarEnd = endOfWeek(monthEnd);

  let current = calendarStart;
  const weeks: { start: Date, end: Date, weekNumber: number, currentWeek: boolean }[] = [];

  while (current <= calendarEnd) {
    const weekStart = current;
    const weekEnd = endOfWeek(weekStart);
    weeks.push({
      start: weekStart,
      end: weekEnd,
      weekNumber: getWeek(weekStart),
      currentWeek: isWithinInterval(date, {start: weekStart, end: weekEnd})
    });
    current = addWeeks(weekStart, 1);
  }

  if (weeks.length > 6) {
    return weeks.slice(0, 6);
  } else {
    while (weeks.length < 6) {
      const lastWeek = weeks[weeks.length - 1];
      const nextWeekStart = addWeeks(lastWeek.start, 1);
      const nextWeekEnd = endOfWeek(nextWeekStart);
      weeks.push({
        start: nextWeekStart,
        end: nextWeekEnd,
        weekNumber: getWeek(nextWeekStart),
        currentWeek: isWithinInterval(date, {start: nextWeekStart, end: nextWeekEnd})
      });
    }
    return weeks;
  }
}