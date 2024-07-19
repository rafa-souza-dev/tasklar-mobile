/* eslint-disable react-hooks/exhaustive-deps */
import {
  NavigationProp,
  RouteProp,
  useNavigation,
} from '@react-navigation/native'
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import { addWeeks, differenceInDays, format, isSameDay } from 'date-fns'
import { useEffect, useState } from 'react'

import { RootStackParamList } from '../@types/navigation'
import { DayOfMonth } from '../components/DayOfMonth'
import { generateWeekOfDay } from '../utils/date'
import { useFormattedJob } from '../modules/jobs/stores'
import { JobTimes } from '../modules/jobs/JobTimes'
import { useCreateService, useServicesByJob } from '../modules/services/stores'
import { Loading } from '../components/Loading'
import { useWhoami } from '../modules/users/stores'

type ContractScreenRouteProp = RouteProp<RootStackParamList, 'JobContract'>

type JobContractProps = {
  route: ContractScreenRouteProp
}

export function JobContract(props: JobContractProps) {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>()
  const { data: user } = useWhoami()
  const { mutate, isPending, isSuccess } = useCreateService()
  const jobId = props.route.params.id
  const { data: job, times, isLoading } = useFormattedJob(jobId)
  const [descriptionNeed, setDescriptionNeed] = useState('')
  const [neighborhood, setNeighborhood] = useState('')
  const currentDate = new Date()
  const currentTime = `${currentDate.getHours()}:${currentDate.getMinutes()}`
  const currentFormattedDate = new Date(new Date().toDateString())
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedWeek, setSelectedWeek] = useState<Date[]>(
    generateWeekOfDay(currentFormattedDate),
  )
  const formattedSelectedDate = selectedDate
    ? format(selectedDate, 'yyyy-MM-dd')
    : undefined
  const { data: services, isFetching } = useServicesByJob(jobId, {
    date: formattedSelectedDate,
    status: 'accepted',
  })
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
  const isNotFormComplete =
    !selectedDate || !selectedTime || !descriptionNeed || !neighborhood

  function handleUpdateWeek(weeks: number) {
    setSelectedWeek((prevState) =>
      generateWeekOfDay(addWeeks(prevState[0], weeks)),
    )
  }

  async function handleCreateService() {
    const body = {
      consumer_id: user?.consumer,
      tasker_id: job?.tasker.id,
      job_id: job?.id,
      request_description: descriptionNeed,
      date: formattedSelectedDate,
      time: `${selectedTime?.slice(0, 5)}:00`,
      status: 'pending',
      uf: job?.tasker?.user?.uf,
      city: job?.tasker?.user?.city,
      neighborhood,
    }

    mutate({ ...body })
  }

  useEffect(() => {
    if (isSuccess) {
      navigation.navigate('JobList')
    }
  }, [isSuccess])

  if (isLoading || isPending) {
    return <Loading />
  }

  return (
    <ScrollView style={{ flex: 1 }}>
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
            <Text style={styles.paginationText}>Semana anterior</Text>
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
          isLoading={isFetching}
        />

        <View>
          <Text style={{ fontSize: 24 }}>Descreva sua necessidade</Text>
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
              onChangeText={(text) => setDescriptionNeed(text)}
              value={descriptionNeed}
              style={{
                padding: 10,
                alignItems: 'flex-end',
                textAlignVertical: 'top',
                fontSize: 16,
              }}
            />
          </View>
        </View>

        <View>
          <Text style={{ fontSize: 24 }}>Qual seu bairro?</Text>
          <View
            style={{
              backgroundColor: 'transparent',
              borderColor: '#000000',
              borderWidth: 1,
              height: 40,
              borderRadius: 8,
              marginTop: 10,
            }}
          >
            <TextInput
              maxLength={30}
              onChangeText={(text) => setNeighborhood(text)}
              value={neighborhood}
              style={{
                padding: 10,
                alignItems: 'flex-end',
                textAlignVertical: 'top',
                fontSize: 16,
              }}
            />
          </View>
        </View>

        <TouchableOpacity
          style={
            isNotFormComplete
              ? styles.paginationButtonDisabled
              : styles.paginationButton
          }
          disabled={isNotFormComplete}
          onPress={handleCreateService}
        >
          <Text style={styles.paginationText}>Contratar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    gap: 20,
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
