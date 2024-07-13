import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'

type DayOfMonthProps = {
  date: Date
  isActive?: boolean
  isDisabled?: boolean
  onPress?: () => void
}

export function DayOfMonth(props: DayOfMonthProps) {
  const style = getStyle(props.isActive, props.isDisabled)
  const formattedDay = format(props.date, 'E', {
    locale: ptBR,
  })
  const formattedDate = format(props.date, 'dd/MM')
  const captalizeDay =
    formattedDay.slice(0, 1).toUpperCase() + formattedDay.slice(1)

  return (
    <TouchableOpacity onPress={props.onPress} disabled={props.isDisabled}>
      <View style={style.container}>
        <Text style={style.dayText}>{captalizeDay}</Text>
        <Text style={style.dayOfMonth}>{formattedDate}</Text>
      </View>
    </TouchableOpacity>
  )
}

function getStyle(isActive?: boolean, isDisabled?: boolean) {
  if (isActive) {
    return stylesActive
  }

  if (isDisabled) {
    return stylesDisabled
  }

  return styles
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    gap: 2,
    alignItems: 'center',
    borderColor: '#12229D',
    borderWidth: 1,
    width: 85,
    borderRadius: 8,
    padding: 4,
  },
  dayText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#12229D',
    fontWeight: '500',
  },
  dayOfMonth: {
    fontSize: 12,
    textAlign: 'center',
    color: '#12229D',
    fontWeight: '500',
  },
})

const stylesDisabled = StyleSheet.create({
  container: {
    flexDirection: 'column',
    gap: 2,
    alignItems: 'center',
    borderColor: '#CDCDCD',
    borderWidth: 1,
    width: 85,
    borderRadius: 8,
    padding: 4,
  },
  dayText: {
    fontSize: 16,
    textAlign: 'center',
    color: 'rgb(159, 153, 153)',
    fontWeight: '500',
  },
  dayOfMonth: {
    fontSize: 12,
    textAlign: 'center',
    color: 'rgb(159, 153, 153)',
    fontWeight: '500',
  },
})

const stylesActive = StyleSheet.create({
  container: {
    flexDirection: 'column',
    gap: 2,
    alignItems: 'center',
    borderColor: '#12229D',
    borderWidth: 1,
    width: 85,
    borderRadius: 8,
    padding: 4,
    backgroundColor: '#abb3f1',
  },
  dayText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#12229D',
    fontWeight: '500',
  },
  dayOfMonth: {
    fontSize: 12,
    textAlign: 'center',
    color: '#12229D',
    fontWeight: '500',
  },
})
