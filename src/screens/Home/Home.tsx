import { StyleSheet, View } from 'react-native'

import { TaskerList } from '../../modules/taskers/TaskerList'

export function Home() {
  return (
    <View style={styles.container}>
      <TaskerList />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
