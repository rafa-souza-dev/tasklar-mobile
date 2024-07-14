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

export function getTimesInInterval(
  startTime: string,
  endTime: string,
  duration: string,
) {}

export function sumTime(time: string, duration: string): string {
  const splitTime = time.split(':')
  const timeHours = splitTime[0]
  const timeMinutes = splitTime[1]
  const durationSplitByHour = duration.split('hr')
  const durationHours = durationSplitByHour[0]
  const durationMinutes = durationSplitByHour[1].slice(0, 2)
  let sumHours = Number(timeHours) + Number(durationHours)
  let sumMinutes = Number(timeMinutes) + Number(durationMinutes)

  if (sumMinutes >= 60) {
    sumMinutes = sumMinutes - 60
    sumHours += 1
  }

  const formattedSumHours = convertTime(sumHours)
  const formattedSumMinutes = convertTime(sumMinutes)

  return `${formattedSumHours}:${formattedSumMinutes}`
}

function convertTime(time: number): string {
  if (time < 10) {
    return `0${time}`
  }

  return String(time)
}

export function isTimeBiggerThan(timeLeft: string, timeRight: string): boolean {
  const splitTimeLeft = timeLeft.split(':')
  const splitTimeRight = timeRight.split(':')
  const leftTimeHours = splitTimeLeft[0]
  const rightTimeHours = splitTimeRight[0]
  const leftTimeMinutes = splitTimeLeft[1]
  const rightTimeMinutes = splitTimeRight[1]

  if (Number(leftTimeHours) > Number(rightTimeHours)) {
    return true
  }

  if (Number(leftTimeHours) === Number(rightTimeHours)) {
    return leftTimeMinutes > rightTimeMinutes
  }

  return false
}
