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

import { useFormattedJobs } from './stores'
import { Skeleton } from './Skeleton'
import { JobItem } from './JobItem'
import { useJobFilter } from './JobFilterContext'

export function JobList() {
  const { isFirstPage, setSelectedPage } = useJobFilter()
  const {
    data: jobs,
    hasJobs,
    limit,
    offset,
    isFetching,
    next,
  } = useFormattedJobs()

  if (isFetching && isFirstPage) {
    return <SkeletonJobList />
  }

  if (!hasJobs) {
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
        data={jobs}
        renderItem={({ item }) => (
          <View style={{ marginVertical: 10 }}>
            <JobItem
              id={item.id}
              key={item.id}
              name={item.tasker.user.name}
              description={item.description}
              rateQuantity={5.0}
              rateValue={24}
              valueBRL={Number(item.value)}
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

function SkeletonJob() {
  return <Skeleton width={'100%'} height={130} />
}

function SkeletonJobList() {
  return (
    <ScrollView style={styles.scroll}>
      <View style={{ flex: 1, paddingHorizontal: 16, gap: 20, marginTop: 10 }}>
        <SkeletonJob />
        <SkeletonJob />
        <SkeletonJob />
        <SkeletonJob />
        <SkeletonJob />
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
