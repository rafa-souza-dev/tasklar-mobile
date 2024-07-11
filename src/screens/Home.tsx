import { StyleSheet, View } from 'react-native'

import { JobList } from '../modules/jobs/JobList'
import { JobFilter } from '../modules/jobs/JobFilter'
import { useWhoami } from '../modules/users/stores'

export function Home() {
  useWhoami()

  return (
    <View style={styles.container}>
      <JobFilter />
      <JobList />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#12229D',
  },
})
