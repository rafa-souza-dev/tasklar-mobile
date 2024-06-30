import { StyleSheet, View } from 'react-native'
import { useEffect, useState } from 'react'

import { TaskerList } from '../../modules/taskers/TaskerList'
import { TaskerFilter } from '../../modules/taskers/TaskerFilter'
import { useIsFocused } from '@react-navigation/native'

export function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string>()
  const isFocused = useIsFocused()

  useEffect(() => {
    if (isFocused) {
      setSelectedCategory(undefined)
    }
  }, [isFocused])

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
