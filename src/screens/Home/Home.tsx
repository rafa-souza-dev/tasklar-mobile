import { StyleSheet, View } from 'react-native'

import { TaskerList } from '../../modules/taskers/TaskerList'
import { TaskerFilter } from '../../modules/taskers/TaskerFilter'

export function Home() {
  return (
    <View style={styles.container}>
      <TaskerFilter />
      <TaskerList />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#12229D',
  },
})
