import { describe, expect, it } from 'vitest'
import { getDay, addWeeks, differenceInDays, differenceInWeeks } from 'date-fns'

import { generateWeekOfDay, sumTime } from './date'

describe('generateWeekOfDay()', () => {
  describe('with current date', () => {
    const currentDate = new Date()
    const currentDay = getDay(currentDate)

    it('should be able to generate week from current date', () => {
      const week = generateWeekOfDay(currentDate)

      expect(getDay(week[currentDay])).toBe(currentDay)
      expect(week.length).toBe(7)
    })
  })

  describe('with next week', () => {
    const currentDate = new Date()
    const nextDate = addWeeks(currentDate, 1)
    const day = getDay(nextDate)

    it('should be able to generate week from next date', () => {
      const week = generateWeekOfDay(nextDate)

      expect(getDay(week[day])).toBe(day)
      expect(week.length).toBe(7)
    })

    it('should be able to compare generated weeks', () => {
      const currentWeek = generateWeekOfDay(currentDate)
      const nextWeek = generateWeekOfDay(nextDate)

      expect(differenceInDays(nextWeek[0], currentWeek[0])).toBe(7)
      expect(differenceInWeeks(nextWeek[0], currentWeek[0])).toBe(1)
    })
  })
})

describe('sumTime()', () => {
  describe('when duration has no minutes', () => {
    describe('when time has no minutes', () => {
      const time = '11:00'
      const duration = '1hr'

      it('should be able to sum time with duration', () => {
        expect(sumTime(time, duration)).toBe('12:00')
      })
    })

    describe('when time has minutes', () => {
      const time = '11:30'
      const duration = '1hr'

      it('should be able to sum time with duration', () => {
        expect(sumTime(time, duration)).toBe('12:30')
      })
    })
  })

  describe('when duration has minutes', () => {
    describe('when time has no minutes', () => {
      const time = '11:00'
      const duration = '1hr30min'

      it('should be able to sum time with duration', () => {
        expect(sumTime(time, duration)).toBe('12:30')
      })
    })

    describe('when time has minutes', () => {
      const time = '10:45'
      const duration = '2hr30min'

      it('should be able to sum time with duration', () => {
        expect(sumTime(time, duration)).toBe('13:15')
      })
    })
  })
})
