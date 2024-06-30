import { ScrollView, StyleSheet, View, Text } from 'react-native'

import { useFormattedTaskers } from './stores'
import { Skeleton } from './Skeleton'
import { TaskerItem } from './TaskerItem'
import { useEffect } from 'react'

type TaskerListProps = {
  category?: string
}

export function TaskerList(props: TaskerListProps) {
  const {
    data: taskers,
    isLoading,
    refetch,
    hasTaskers,
  } = useFormattedTaskers({
    category: props.category,
  })

  useEffect(() => {
    refetch()
  }, [props.category, refetch])

  if (isLoading) {
    return <SkeletonTaskerList />
  }

  if (!hasTaskers) {
    return (
      <View style={styles.emptyStateContainer}>
        <Text style={styles.emptyStateText}>
          Nenhum prestador foi encontrado, tente filtrar por outra categoria.
        </Text>
      </View>
    )
  }

  return (
    <ScrollView style={styles.scroll}>
      <View style={styles.container}>
        {taskers?.map((tasker) => (
          <TaskerItem
            id={tasker.id}
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
  },
  emptyStateContainer: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyStateText: {
    color: 'white',
    fontSize: 24,
    textAlign: 'center',
  },
})
