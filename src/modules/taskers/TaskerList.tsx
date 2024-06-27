import { ScrollView, StyleSheet, View } from 'react-native'

import { useTaskers } from './stores'
import { Skeleton } from './Skeleton'
import { TaskerItem } from './TaskerItem'

export function TaskerList() {
  const { data: taskers, isLoading } = useTaskers()

  if (isLoading) {
    return <SkeletonTaskerList />
  }

  return (
    <ScrollView style={styles.scroll}>
      <View style={styles.container}>
        {taskers?.map((tasker) => (
          <TaskerItem
            key={tasker.id}
            name={tasker.user.name}
            description={tasker.description}
            rateQuantity={5.0}
            rateValue={24}
            valueBRL={tasker.hourly_rate}
          />
        ))}
      </View>
    </ScrollView>
  )
}

function SkeletonTaskerList() {
  return (
    <ScrollView style={styles.scroll}>
      <View style={styles.container}>
        <SkeletonTasker />
        <SkeletonTasker />
        <SkeletonTasker />
        <SkeletonTasker />
        <SkeletonTasker />
      </View>
    </ScrollView>
  )
}

function SkeletonTasker() {
  return <Skeleton width={'100%'} height={130} />
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    gap: 16,
  },
  scroll: {
    flex: 1,
    backgroundColor: '#12229D',
  },
})
