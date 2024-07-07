import { Picker } from '@react-native-picker/picker'
import { useState } from 'react'
import {
  Button,
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'
import { StateAbbreviation } from './types'
import { cities, states } from './mock'
import { MaterialIcons } from '@expo/vector-icons'
import { useTaskerFilter } from './TaskerFilterContext'

export function TaskerFilterDialog() {
  const [modalVisible, setModalVisible] = useState(false)
  const [selectedState, setSelectedState] = useState<
    StateAbbreviation | undefined
  >(undefined)
  const [selectedCity, setSelectedCity] = useState<string | undefined>(
    undefined,
  )
  const { setSelectedLocation, clear } = useTaskerFilter()
  const hasLocationFilter = selectedCity && selectedState

  const applyFilters = () => {
    if (hasLocationFilter) {
      setSelectedLocation(selectedState, selectedCity)
    }
    setModalVisible(false)
  }

  const clearFilters = () => {
    if (hasLocationFilter) {
      clear()
      setSelectedState(undefined)
      setSelectedCity(undefined)
    }
    setModalVisible(false)
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          setModalVisible(true)
        }}
      >
        <MaterialIcons name="format-list-bulleted" size={24} color="black" />
      </TouchableOpacity>
      <Modal
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPressOut={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Filtros</Text>
            <Picker
              selectedValue={selectedState}
              onValueChange={(itemValue) => {
                setSelectedState(itemValue as StateAbbreviation)
                setSelectedCity(undefined) // Reset city when state changes
              }}
              style={styles.picker}
            >
              <Picker.Item label="Selecione um estado" value={undefined} />
              {states.map((state) => (
                <Picker.Item
                  key={state.value}
                  label={state.label}
                  value={state.value}
                />
              ))}
            </Picker>
            <Picker
              selectedValue={selectedCity}
              onValueChange={(itemValue) => setSelectedCity(itemValue)}
              enabled={selectedState !== undefined}
              style={styles.picker}
            >
              <Picker.Item label="Selecione uma cidade" value={undefined} />
              {selectedState &&
                cities[selectedState]?.map((city) => (
                  <Picker.Item key={city} label={city} value={city} />
                ))}
            </Picker>
            <View style={{ gap: 8 }}>
              <Button title="Aplicar Filtros" onPress={applyFilters} />
              <Button
                title="Limpar filtros"
                onPress={clearFilters}
                color={'red'}
              />
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContainer: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  picker: {
    height: 50,
    width: 250,
    marginBottom: 20,
  },
})
