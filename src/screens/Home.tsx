import { StyleSheet, View } from 'react-native'

import { TaskerList } from '../modules/taskers/TaskerList'
import { TaskerFilter } from '../modules/taskers/TaskerFilter'
import { TaskerFilterProvider } from '../modules/taskers/TaskerFilterContext'

export function Home() {
  return (
    <TaskerFilterProvider>
      <View style={styles.container}>
        <TaskerFilter />
        <TaskerList />
      </View>
    </TaskerFilterProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#12229D',
  },
})
