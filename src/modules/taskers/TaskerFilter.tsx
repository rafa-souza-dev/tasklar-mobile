import { ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { View } from 'react-native-ui-lib'
import { Category } from './types'
import { useState } from 'react'

const categories: Category[] = [
  {
    id: 1,
    name: 'Faxina',
  },
  {
    id: 2,
    name: 'Jardinagem',
  },
  {
    id: 3,
    name: 'Reparos',
  },
  {
    id: 4,
    name: 'Eletricista',
  },
  {
    id: 5,
    name: 'Pintura',
  },
] as const

export function TaskerFilter() {
  const [selectedCategoryId, setSelectedCategoryId] = useState(1)

  return (
    <View
      style={{
        padding: 10,
      }}
    >
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {categories.map((category) => {
          const isSelected = category.id === selectedCategoryId
          const buttonStyle = isSelected ? styles.activeButton : styles.button
          const labelStyle = isSelected ? styles.activeLabel : styles.label

          return (
            <TouchableOpacity
              key={category.id}
              style={buttonStyle}
              onPress={() => {
                setSelectedCategoryId(category.id)
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
