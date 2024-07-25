/* eslint-disable react-hooks/exhaustive-deps */
import { View, Text, StyleSheet } from 'react-native'
import { Agenda, AgendaEntry } from 'react-native-calendars'
import { useServicesByTasker } from '../modules/services/stores'
import { useWhoami } from '../modules/users/stores'
import { useEffect, useState } from 'react'
import { addMonths, format } from 'date-fns'

export default function ServiceProviderSchedule() {
  const { data: user } = useWhoami()
  const currentDate = format(new Date(), 'yyyy-MM-dd')
  const currentFormattedDate = format(new Date(), 'yyyy-MM-dd')
  const [selectedDate, setSelectedDate] = useState(currentFormattedDate)
  const { data: services, refetch } = useServicesByTasker(user?.tasker ?? 0, {
    status: 'accepted',
    date: selectedDate,
  })

  console.log(services)

  useEffect(() => {
    refetch()
  }, [selectedDate])

  const itemsServices = services?.reduce(
    (acc, element) => {
      const date = element.date
      if (!acc[date]) {
        acc[date] = []
      }
      acc[date].push({
        name: `${element.consumer.user.name} - ${element.consumer.user.phone}\n${element.city} - ${element.neighborhood}`,
        height: 50,
        day: date,
      })
      return acc
    },
    {} as Record<
      string,
      {
        name: string
        height: number
        day: string
      }[]
    >,
  )

  console.log(itemsServices)

  const renderItem = (item: AgendaEntry): JSX.Element => {
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
      items={itemsServices ?? {}}
      loadItemsForMonth={(month: {
        dateString: string
        day: number
        month: number
        timestamp: number
        year: number
      }) => {
        setSelectedDate(month.dateString)
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
