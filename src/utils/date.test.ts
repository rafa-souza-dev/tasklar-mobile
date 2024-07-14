import { describe, expect, it } from 'vitest'
import { getDay, addWeeks, differenceInDays, differenceInWeeks } from 'date-fns'

import {
  generateWeekOfDay,
  getTimesInInterval,
  isTimeBiggerThan,
  sumTime,
} from './date'

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

describe('isTimeBiggerThan()', () => {
  describe('when left and right time have no minutes', () => {
    const leftTime = '12:00'
    const rightTime = '11:00'

    it('should return true', () => {
      expect(isTimeBiggerThan(leftTime, rightTime)).toBe(true)
    })
  })

  describe('when left and right time have minutes', () => {
    const leftTime = '12:30'
    const rightTime = '11:15'

    it('should return true', () => {
      expect(isTimeBiggerThan(leftTime, rightTime)).toBe(true)
    })
  })

  describe('when left and right have equal hours', () => {
    describe('when left time is less than right', () => {
      const leftTime = '11:10'
      const rightTime = '11:15'

      it('should return false', () => {
        expect(isTimeBiggerThan(leftTime, rightTime)).toBe(false)
      })
    })

    describe('when left time is bigger than right', () => {
      const leftTime = '11:30'
      const rightTime = '11:15'

      it('should return true', () => {
        expect(isTimeBiggerThan(leftTime, rightTime)).toBe(true)
      })
    })
  })

  describe('when the left time is less than right', () => {
    describe('without minutes', () => {
      const leftTime = '8:00'
      const rightTime = '11:00'

      it('should return false', () => {
        expect(isTimeBiggerThan(leftTime, rightTime)).toBe(false)
      })
    })

    describe('with minutes only in left', () => {
      const leftTime = '8:30'
      const rightTime = '11:00'

      it('should return false', () => {
        expect(isTimeBiggerThan(leftTime, rightTime)).toBe(false)
      })
    })

    describe('with minutes only in right', () => {
      const leftTime = '8:00'
      const rightTime = '11:30'

      it('should return false', () => {
        expect(isTimeBiggerThan(leftTime, rightTime)).toBe(false)
      })
    })

    describe('with minutes in both sides', () => {
      const leftTime = '8:50'
      const rightTime = '11:30'

      it('should return false', () => {
        expect(isTimeBiggerThan(leftTime, rightTime)).toBe(false)
      })
    })
  })

  describe('when the times are equals', () => {
    const leftTime = '8:00'
    const rightTime = '8:00'

    it('should return false', () => {
      expect(isTimeBiggerThan(leftTime, rightTime)).toBe(false)
    })
  })
})

describe('getTimesInInterval()', () => {
  describe('when end time is less than start time', () => {
    const startTime = '11:00'
    const endTime = '8:00'
    const duration = '1hr30min'

    it('should return empty times list', () => {
      expect(getTimesInInterval({ startTime, endTime, duration })).toHaveLength(
        0,
      )
    })
  })

  describe('when end time is less than start time', () => {
    describe('when not have minutes', () => {
      const startTime = '8:00'
      const endTime = '11:00'
      const duration = '1hr00min'

      it('should return 3 times', () => {
        expect(
          getTimesInInterval({ startTime, endTime, duration }),
        ).toHaveLength(3)
      })
    })

    describe('when have minutes', () => {
      const startTime = '8:00'
      const endTime = '12:00'
      const duration = '1hr30min'

      it('should return 3 times', () => {
        expect(
          getTimesInInterval({ startTime, endTime, duration }),
        ).toHaveLength(3)
      })
    })
  })
})
