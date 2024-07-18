import { addDays, getDay } from 'date-fns'

export function generateWeekOfDay(date: Date): Date[] {
  const day = getDay(date)
  const week: Date[] = []

  for (let i = day; i > 0; i--) {
    week.push(addDays(date, -i))
  }

  week.push(date)

  for (let i = 1; i <= 6 - day; i++) {
    week.push(addDays(date, i))
  }

  return week
}

type GetTimesInIntervalParams = {
  startTime: string
  endTime: string
  duration: string
}

export function getTimesInInterval(params: GetTimesInIntervalParams): string[] {
  const formattedStartTime = formatTime(params.startTime)
  const formattedEndTime = formatTime(params.endTime)
  const times: string[] = []

  if (isTimeBiggerThan(formattedStartTime, formattedEndTime)) {
    return []
  }

  times.push(formattedStartTime)

  let nextTime = sumTime(times[times.length - 1], params.duration)

  while (
    !isTimeBiggerThan(nextTime, formattedEndTime) &&
    nextTime !== formattedEndTime
  ) {
    times.push(nextTime)

    nextTime = sumTime(times[times.length - 1], params.duration)
  }

  return times
}

function formatTime(time: string) {
  if (time.length === 5) {
    return time
  }

  return time.slice(0, 5)
}

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
