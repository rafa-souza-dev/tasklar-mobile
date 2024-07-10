import { ScrollView, View } from 'react-native'
import { Skeleton } from './Skeleton'

export function SkeletonJobFilter() {
  return (
    <View
      style={{
        padding: 10,
      }}
    >
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ gap: 16 }}
      >
        <Skeleton
          width={100}
          height={25}
          styles={{
            marginHorizontal: 4,
            borderRadius: 40,
          }}
        />
        <Skeleton
          width={100}
          height={25}
          styles={{
            marginHorizontal: 4,
            borderRadius: 40,
          }}
        />
        <Skeleton
          width={100}
          height={25}
          styles={{
            marginHorizontal: 4,
            borderRadius: 40,
          }}
        />
        <Skeleton
          width={100}
          height={25}
          styles={{
            marginHorizontal: 4,
            borderRadius: 40,
          }}
        />
        <Skeleton
          width={100}
          height={25}
          styles={{
            marginHorizontal: 4,
            borderRadius: 40,
          }}
        />
      </ScrollView>
    </View>
  )
}
