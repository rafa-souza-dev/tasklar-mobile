import { RouteProp } from '@react-navigation/native'
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import { addWeeks, differenceInDays, format, isSameDay } from 'date-fns'
import { useState } from 'react'

import { RootStackParamList } from '../@types/navigation'
import { DayOfMonth } from '../components/DayOfMonth'
import { generateWeekOfDay } from '../utils/date'
import { useFormattedJob } from '../modules/jobs/stores'
import { JobTimes } from '../modules/jobs/JobTimes'
import { useServicesByJob } from '../modules/services/stores'

type ContractScreenRouteProp = RouteProp<RootStackParamList, 'JobContract'>

type JobContractProps = {
  route: ContractScreenRouteProp
}

export function JobContract(props: JobContractProps) {
  const jobId = props.route.params.id
  const { data: job, times } = useFormattedJob(jobId)
  const [value, onChangeText] = useState('Useless Multiline Placeholder')
  const currentDate = new Date()
  const currentTime = `${currentDate.getHours()}:${currentDate.getMinutes()}`
  const currentFormattedDate = new Date(new Date().toDateString())
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedWeek, setSelectedWeek] = useState<Date[]>(
    generateWeekOfDay(currentFormattedDate),
  )
  const { data: services, isLoading: isLoadingServices } = useServicesByJob(
    jobId,
    {
      date: selectedDate ? format(selectedDate, 'yyyy-MM-dd') : undefined,
      status: 'accepted',
    },
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
  const isInCurrentDay = Boolean(
    selectedDate && isSameDay(currentFormattedDate, selectedDate),
  )

  function handleUpdateWeek(weeks: number) {
    setSelectedWeek((prevState) =>
      generateWeekOfDay(addWeeks(prevState[0], weeks)),
    )
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Horários do Prestador</Text>

      <View style={styles.weekContainer}>
        {selectedWeek.map((date, index) => (
          <DayOfMonth
            key={String(index)}
            date={date}
            isActive={Boolean(selectedDate) && isSameDay(date, selectedDate!)}
            isDisabled={
              date < currentFormattedDate ||
              job?.days_of_week_display[index] === false
            }
            onPress={() => {
              setSelectedTime(null)
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
            setSelectedDate(null)
            setSelectedTime(null)
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
            setSelectedDate(null)
            setSelectedTime(null)
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

      <JobTimes
        hasSelectedDate={Boolean(selectedDate)}
        currentTime={currentTime}
        setSelectedTime={setSelectedTime}
        times={times}
        isInCurrentDay={isInCurrentDay}
        selectedTime={selectedTime}
        services={services}
        isLoading={isLoadingServices}
      />

      <View>
        <Text style={{ fontSize: 16 }}>Descreva sua necessidade</Text>
        <View
          style={{
            backgroundColor: 'transparent',
            borderColor: '#000000',
            borderWidth: 1,
            height: 100,
            borderRadius: 8,
            marginTop: 10,
          }}
        >
          <TextInput
            multiline
            numberOfLines={5}
            maxLength={500}
            onChangeText={(text) => onChangeText(text)}
            value={value}
            style={{
              padding: 10,
              alignItems: 'flex-end',
              textAlignVertical: 'top',
            }}
          />
        </View>
      </View>

      <TouchableOpacity style={styles.paginationButton}>
        <Text style={styles.paginationText}>Contratar</Text>
      </TouchableOpacity>
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
