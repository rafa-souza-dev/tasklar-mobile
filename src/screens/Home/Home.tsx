import { StyleSheet, View } from 'react-native'
import { useState } from 'react'

import { TaskerList } from '../../modules/taskers/TaskerList'
import { TaskerFilter } from '../../modules/taskers/TaskerFilter'

export function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string>()

  return (
    <View style={styles.container}>
      <TaskerFilter
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <TaskerList category={selectedCategory} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#12229D',
  },
})
