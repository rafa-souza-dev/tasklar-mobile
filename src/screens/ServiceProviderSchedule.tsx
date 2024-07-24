import { View, Text, StyleSheet } from 'react-native'
import {
  Agenda,
  AgendaSchedule,
  AgendaEntry,
  DateData,
} from 'react-native-calendars'
import { useServicesByTasker } from '../modules/services/stores'
import { useWhoami } from '../modules/users/stores'
import { useState } from 'react'
import { addMonths, format } from 'date-fns'

export default function ServiceProviderSchedule() {
  const { data: user } = useWhoami()
  const { data: services } = useServicesByTasker(user?.tasker ?? 0, {
    status: 'accepted',
  })
  const currentDate = format(new Date(), 'yyyy-MM-dd')
  const [selectedDate, setSelectedDate] = useState(currentDate)

  console.log(services)

  const items: AgendaSchedule = {
    [currentDate]: [
      { name: 'Entrevista com candidato A', height: 50, day: currentDate },
    ],
    '2024-07-19': [
      { name: 'Reunião de equipe', height: 80, day: '2024-07-19' },
    ],
    '2024-07-20': [],
    '2024-07-21': [
      { name: 'Entrega de relatório', height: 50, day: '2024-07-21' },
      { name: 'Análise de dados', height: 50, day: '2024-07-21' },
    ],
  }

  const renderItem = (
    item: AgendaEntry,
    firstItemInDay: boolean,
  ): JSX.Element => {
    return (
      <View style={[styles.item, { height: item.height }]}>
        <Text>{item.name}</Text>
      </View>
    )
  }

  const renderEmptyDate = (): JSX.Element => {
    return (
      <View style={styles.emptyDate}>
        <Text>Sem eventos para este dia</Text>
      </View>
    )
  }

  return (
    <Agenda
      items={items}
      loadItemsForMonth={(month: {
        dateString: string
        day: number
        month: number
        timestamp: number
        year: number
      }) => {
        console.log('trigger items loading', month)
      }}
      onDayPress={(day: DateData) => {
        console.log('day pressed', day)
      }}
      selected={selectedDate}
      minDate={currentDate}
      maxDate={addMonths(new Date(currentDate), 1)}
      pastScrollRange={3}
      futureScrollRange={3}
      renderItem={renderItem}
      renderEmptyDate={renderEmptyDate}
      renderKnob={() => {
        return <View style={styles.knob} />
      }}
      renderEmptyData={() => {
        return <View style={styles.emptyData} />
      }}
      rowHasChanged={(r1: AgendaEntry, r2: AgendaEntry) => {
        return r1.name !== r2.name
      }}
      hideKnob={false}
      showClosingKnob={true}
      disabledByDefault={false}
      refreshing={false}
      theme={{
        agendaDayTextColor: 'black',
        agendaDayNumColor: 'green',
        agendaTodayColor: 'red',
        agendaKnobColor: 'blue',
      }}
      style={{}}
    />
  )
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
  },
  emptyDate: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
  },
  knob: {
    width: 100,
    height: 5,
    backgroundColor: 'blue',
    marginTop: 10,
    borderRadius: 5,
  },
  emptyData: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
