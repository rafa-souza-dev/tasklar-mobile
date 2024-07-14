import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'

type ScheduleTimeProps = {
  time: string
  isActive?: boolean
  isDisabled?: boolean
  onPress?: () => void
}

export function ScheduleTime(props: ScheduleTimeProps) {
  const style = getStyle(props.isActive, props.isDisabled)

  return (
    <TouchableOpacity
      onPress={props.onPress}
      disabled={props.isDisabled || props.isActive}
    >
      <View style={style.container}>
        <Text style={style.dayText}>{props.time}</Text>
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
    width: 60,
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
    width: 60,
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
    width: 60,
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
