import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'

import { useCategories } from '../categories/store'
import { SkeletonJobFilter } from './SkeletonJobFilter'
import { useJobFilter } from './JobFilterContext'

export function JobFilter() {
  const { data: categories, isLoading } = useCategories()
  const { params, setSelectedCategory } = useJobFilter()

  if (isLoading) {
    return <SkeletonJobFilter />
  }

  return (
    <View
      style={{
        padding: 10,
      }}
    >
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {categories?.map((category) => {
          const isSelected = category.name === params.category
          const buttonStyle = isSelected ? styles.activeButton : styles.button
          const labelStyle = isSelected ? styles.activeLabel : styles.label

          return (
            <TouchableOpacity
              key={category.id}
              style={buttonStyle}
              onPress={() => {
                if (isSelected) {
                  setSelectedCategory(undefined)
                  return
                }

                setSelectedCategory(category.name)
              }}
            >
              <Text style={labelStyle}>{category.name}</Text>
            </TouchableOpacity>
          )
        })}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  scrollView: {
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 8,
  },
  button: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 40,
    marginHorizontal: 4,
  },
  activeButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#FF7F50',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 40,
    marginHorizontal: 4,
  },
  label: {
    fontSize: 16,
    color: '#12229D',
    fontWeight: '600',
  },
  activeLabel: {
    fontSize: 16,
    color: 'white',
    fontWeight: '600',
  },
})
