import { View, StyleSheet, Text, ActivityIndicator } from 'react-native'

import { ScheduleTime } from '../../components/ScheduleTime'
import { isTimeBiggerThan } from '../../utils/date'
import { Service } from '../services/types'

type JobTimesProps = {
  times: string[] | null
  isInCurrentDay?: boolean
  currentTime: string
  selectedTime: string | null
  setSelectedTime: (time: string) => void
  isLoading?: boolean
  services?: Service[]
  hasSelectedDate: boolean
}

export function JobTimes(props: JobTimesProps) {
  const lockTimes = props.services?.map((service) => service.time.slice(0, 5))

  if (props.isLoading) {
    return (
      <View
        style={{ height: 120, alignItems: 'center', justifyContent: 'center' }}
      >
        <ActivityIndicator size="large" color="#12229D" />
      </View>
    )
  }

  if (!props.hasSelectedDate) {
    return (
      <View
        style={{ height: 120, alignItems: 'center', justifyContent: 'center' }}
      >
        <Text style={{ textAlign: 'center', fontSize: 24 }}>
          Selecione uma data para ver os horários disponíveis.
        </Text>
      </View>
    )
  }

  return (
    <View style={styles.scheduleContainer}>
      {props.times?.map((time, index) => (
        <ScheduleTime
          key={index}
          time={time}
          isDisabled={
            (Boolean(props.isInCurrentDay) &&
              isTimeBiggerThan(props.currentTime, time)) ||
            lockTimes?.includes(time)
          }
          isActive={props.selectedTime === time}
          onPress={() => {
            props.setSelectedTime(time)
          }}
        />
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
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
