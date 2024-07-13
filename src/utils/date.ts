import { addDays, getDay } from 'date-fns'

export function generateWeekOfDay(date: Date): Date[] {
  const day = getDay(date)
  const week: Date[] = []

  for (let i = day; i > 0; i--) {
    week.push(addDays(date, i * -1))
  }

  week.push(date)

  for (let i = day; i < 6; i++) {
    week.push(addDays(date, i + 1))
  }

  return week
}
