import { RouteProp } from '@react-navigation/native'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { addWeeks, differenceInDays, isSameDay, setDay } from 'date-fns'
import { useEffect, useState } from 'react'
import { RootStackParamList } from '../@types/navigation'

import { DayOfMonth } from '../components/DayOfMonth'
import {
  generateWeekOfDay,
  getTimesInInterval,
  isTimeBiggerThan,
} from '../utils/date'
import { ScheduleTime } from '../components/ScheduleTime'
import { Job } from '../modules/jobs/types'

type ContractScreenRouteProp = RouteProp<RootStackParamList, 'JobContract'>

type JobContractProps = {
  route: ContractScreenRouteProp
}

const mockJob: Job = {
  category: {
    id: 1,
    name: 'faxina',
  },
  contact: '1',
  days_of_week_display: [false, false, true, true, true, false, true],
  description: 'teste',
  duration: '1hr30min',
  start_time: '06:00:00',
  end_time: '23:30:00',
  id: 1,
  tasker: {
    id: 1,
    user: {
      name: 'a',
    },
  },
  value: 100,
} as const

function getFirstServiceDayIndex(days: boolean[]): number {
  for (let i = 0; i < days.length; i++) {
    if (days[i] === true) {
      return i
    }
  }

  return 0
}

export function JobContract(props: JobContractProps) {
  const currentDate = new Date()
  const currentTime = `${currentDate.getHours()}:${currentDate.getMinutes()}`
  const foundFirstJobDay = getFirstServiceDayIndex(mockJob.days_of_week_display)
  const currentFormattedDate = new Date(new Date().toDateString())
  const [selectedDate, setSelectedDate] = useState<Date>(
    setDay(currentFormattedDate, foundFirstJobDay),
  )
  const [selectedWeek, setSelectedWeek] = useState<Date[]>(
    generateWeekOfDay(currentFormattedDate),
  )
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const isInCurrentWeek = selectedWeek.some((date) =>
    isSameDay(date, currentFormattedDate),
  )
  const hasNextWeekInNext30Days =
    differenceInDays(
      generateWeekOfDay(addWeeks(selectedWeek[0], 1))[0],
      currentFormattedDate,
    ) >= 30
  const times = getTimesInInterval({
    startTime: mockJob.start_time,
    endTime: mockJob.end_time,
    duration: mockJob.duration,
  })
  const isInCurrentDay = isSameDay(currentFormattedDate, selectedDate)

  function handleUpdateWeek(weeks: number) {
    setSelectedWeek((prevState) =>
      generateWeekOfDay(addWeeks(prevState[0], weeks)),
    )
  }

  useEffect(() => {
    setSelectedTime(null)
  }, [selectedDate])

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Horários do Prestador</Text>

      <View style={styles.weekContainer}>
        {selectedWeek.map((date, index) => (
          <DayOfMonth
            key={String(index)}
            date={date}
            isActive={isSameDay(date, selectedDate)}
            isDisabled={
              date < currentFormattedDate ||
              mockJob.days_of_week_display[index] === false
            }
            onPress={() => {
              setSelectedDate(date)
            }}
          />
        ))}
      </View>

      <View style={styles.pagination}>
        <TouchableOpacity
          style={
            isInCurrentWeek
              ? styles.paginationButtonDisabled
              : styles.paginationButton
          }
          disabled={isInCurrentWeek}
          onPress={() => {
            handleUpdateWeek(-1)
          }}
        >
          <Text
            style={
              isInCurrentWeek
                ? styles.paginationTextDisabled
                : styles.paginationText
            }
          >
            Semana anterior
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={
            hasNextWeekInNext30Days
              ? styles.paginationButtonDisabled
              : styles.paginationButton
          }
          onPress={() => {
            handleUpdateWeek(1)
          }}
          disabled={hasNextWeekInNext30Days}
        >
          <Text
            style={
              hasNextWeekInNext30Days
                ? styles.paginationTextDisabled
                : styles.paginationText
            }
          >
            Próxima semana
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.scheduleContainer}>
        {times.map((time, index) => (
          <ScheduleTime
            key={index}
            time={time}
            isDisabled={isInCurrentDay && isTimeBiggerThan(currentTime, time)}
            isActive={selectedTime === time}
            onPress={() => {
              setSelectedTime(time)
            }}
          />
        ))}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    gap: 16,
  },
  weekContainer: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  paginationText: {
    fontSize: 16,
  },
  paginationTextDisabled: {
    fontSize: 16,
    color: 'white',
  },
  paginationButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#abb3f1',
    padding: 10,
    borderRadius: 40,
  },
  paginationButtonDisabled: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#CDCDCD',
    padding: 10,
    borderRadius: 40,
  },
  scheduleContainer: {
    paddingHorizontal: 16,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    width: '100%',
    alignContent: 'flex-start',
    justifyContent: 'center',
    alignItems: 'center',
  },
})
