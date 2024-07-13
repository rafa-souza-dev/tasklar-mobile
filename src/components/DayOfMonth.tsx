import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'

type DayOfMonthProps = {
  date: Date
  isActive?: boolean
  isDisabled?: boolean
  onPress?: () => void
}

export function DayOfMonth(props: DayOfMonthProps) {
  const style = getStyle(props.isActive, props.isDisabled)

  return (
    <TouchableOpacity onPress={props.onPress}>
      <View style={style.container}>
        <Text style={style.dayText}>Domingo</Text>
        <Text style={style.dayOfMonth}>22/06</Text>
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
    width: 90,
    borderRadius: 8,
    padding: 8,
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
    width: 90,
    borderRadius: 8,
    padding: 6,
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
