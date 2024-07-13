import { RouteProp } from '@react-navigation/native'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { addDays, addWeeks, isSameDay } from 'date-fns'
import { useState } from 'react'

import { RootStackParamList } from '../@types/navigation'
import { DayOfMonth } from '../components/DayOfMonth'
import { generateWeekOfDay } from '../utils/date'

type ContractScreenRouteProp = RouteProp<RootStackParamList, 'JobContract'>

type JobContractProps = {
  route: ContractScreenRouteProp
}

export function JobContract(props: JobContractProps) {
  const currentDate = new Date(addDays(new Date().toDateString(), -3))
  const [selectedDate, setSelectedDate] = useState<Date>(currentDate)
  const [selectedWeek, setSelectedWeek] = useState<Date[]>(
    generateWeekOfDay(currentDate),
  )
  const isInCurrentWeek = selectedWeek.some((date) =>
    isSameDay(date, currentDate),
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
            isActive={isSameDay(date, selectedDate)}
            isDisabled={date < currentDate}
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
          style={styles.paginationButton}
          onPress={() => {
            handleUpdateWeek(1)
          }}
        >
          <Text style={styles.paginationText}>Próxima semana</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
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
    marginTop: 10,
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
})
