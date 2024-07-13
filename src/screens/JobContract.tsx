import { RouteProp } from '@react-navigation/native'
import { StyleSheet, Text, View } from 'react-native'

import { RootStackParamList } from '../@types/navigation'
import { DayOfMonth } from '../components/DayOfMonth'
import { useState } from 'react'
import { generateWeekOfDay } from '../utils/date'
import { addDays, isSameDay } from 'date-fns'

type ContractScreenRouteProp = RouteProp<RootStackParamList, 'JobContract'>

type JobContractProps = {
  route: ContractScreenRouteProp
}

export function JobContract(props: JobContractProps) {
  const currentDate = addDays(new Date(), -3)
  const [selectedDate, setSelectedDate] = useState<Date>(currentDate)
  const week = generateWeekOfDay(currentDate)

  return (
    <>
      <View>
        <Text>{props.route.params.id}</Text>
      </View>
      <View style={styles.weekContainer}>
        {week.map((date, index) => (
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
    </>
  )
}

const styles = StyleSheet.create({
  weekContainer: {
    flexDirection: 'row',
    gap: 8,
    padding: 6,
    flexWrap: 'wrap',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
