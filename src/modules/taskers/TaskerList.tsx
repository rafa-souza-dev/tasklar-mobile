import { StyleSheet, View } from 'react-native'
import { Tasker } from './Tasker'

export function TaskerList() {
  return (
    <View style={styles.container}>
      <Tasker />
      <Tasker />
      <Tasker />
      <Tasker />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#12229D',
    gap: 16,
  },
})
