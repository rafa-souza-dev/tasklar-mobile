/* eslint-disable react-hooks/exhaustive-deps */
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  FlatList,
  ScrollView,
  ActivityIndicator,
} from 'react-native'

import { useFormattedTaskers } from './stores'
import { Skeleton } from './Skeleton'
import { TaskerItem } from './TaskerItem'
import { useTaskerFilter } from './TaskerFilterContext'

export function TaskerList() {
  const { isFirstPage, setSelectedPage } = useTaskerFilter()
  const {
    data: taskers,
    hasTaskers,
    limit,
    offset,
    isFetching,
    next,
  } = useFormattedTaskers()

  if (isFetching && isFirstPage) {
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
    <SafeAreaView style={styles.scroll}>
      <FlatList
        data={taskers}
        renderItem={({ item }) => (
          <View style={{ marginVertical: 10 }}>
            <TaskerItem
              id={item.id}
              key={item.id}
              name={item.user.name}
              description={item.description}
              rateQuantity={5.0}
              rateValue={24}
              valueBRL={item.hourly_rate}
            />
          </View>
        )}
        keyExtractor={(item) => String(item.id)}
        style={styles.container}
        contentContainerStyle={{ paddingBottom: 20 }}
        ListFooterComponent={<Loading loading={Boolean(next)} />}
        onEndReached={() => {
          if (next) {
            setSelectedPage(limit, offset)
          }
        }}
        onEndReachedThreshold={0.1}
      />
    </SafeAreaView>
  )
}

function Loading({ loading }: { loading: boolean }) {
  if (loading) return <ActivityIndicator size={'large'} color={'white'} />

  return null
}

function SkeletonTasker() {
  return <Skeleton width={'100%'} height={130} />
}

function SkeletonTaskerList() {
  return (
    <ScrollView style={styles.scroll}>
      <View style={{ flex: 1, paddingHorizontal: 16, gap: 20, marginTop: 10 }}>
        <SkeletonTasker />
        <SkeletonTasker />
        <SkeletonTasker />
        <SkeletonTasker />
        <SkeletonTasker />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
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
