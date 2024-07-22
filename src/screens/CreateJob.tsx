import React, { useEffect, useState } from 'react'
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Text,
  Switch,
  ScrollView,
} from 'react-native'
import { z } from 'zod'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { RootStackParamList } from '../@types/navigation'
import { Picker } from '@react-native-picker/picker'
import MaskInput from 'react-native-mask-input'
import { useCategories } from '../modules/categories/store'
import { useWhoami } from '../modules/users/stores'
import { useCreateJob } from '../modules/jobs/stores'
import { Loading } from '../components/Loading'

const phoneSchema = z.string().regex(/^\(\d{2}\) \d{5}-\d{4}$/, {
  message: 'Telefone inválido, use o formato (99) 99999-9999',
})
const valueSchema = z.number().min(1, { message: 'Valor inválido' })
const descriptionSchema = z.string().min(1, { message: 'Descrição inválida' })

export function CreateJob() {
  const { data: categories } = useCategories()
  const { data: user } = useWhoami()
  const [contact, setContact] = useState('')
  const [value, setValue] = useState(0)
  const [category, setCategory] = useState(categories?.[0].id)
  const [description, setDescription] = useState('')
  const [duration, setDuration] = useState('1hr')
  const [startTime, setStartTime] = useState('06:00:00')
  const [endTime, setEndTime] = useState('07:00:00')
  const [daysOfWeek, setDaysOfWeek] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ])
  const [contactError, setContactError] = useState('')
  const [valueError, setValueError] = useState('')
  const [descriptionError, setDescriptionError] = useState('')
  const { mutateAsync, isPending, isSuccess } = useCreateJob()
  const navigation = useNavigation<NavigationProp<RootStackParamList>>()

  const clear = () => {
    setContact('')
    setValue(0)
    setCategory(categories?.[0].id)
    setDescription('')
    setDuration('1hr')
    setStartTime('06:00:00')
    setEndTime('07:00:00')
    setDaysOfWeek([false, false, false, false, false, false, false])
    setContactError('')
    setValueError('')
    setDescriptionError('')
  }

  const timeOptions = [
    { label: '6am', value: '06:00:00' },
    { label: '7am', value: '07:00:00' },
    { label: '8am', value: '08:00:00' },
    { label: '9am', value: '09:00:00' },
    { label: '10am', value: '10:00:00' },
    { label: '11am', value: '11:00:00' },
    { label: '12pm', value: '12:00:00' },
    { label: '1pm', value: '13:00:00' },
    { label: '2pm', value: '14:00:00' },
    { label: '3pm', value: '15:00:00' },
    { label: '4pm', value: '16:00:00' },
    { label: '5pm', value: '17:00:00' },
    { label: '6pm', value: '18:00:00' },
    { label: '7pm', value: '19:00:00' },
    { label: '8pm', value: '20:00:00' },
    { label: '9pm', value: '21:00:00' },
    { label: '10pm', value: '22:00:00' },
    { label: '11pm', value: '23:00:00' },
    { label: '12am', value: '00:00:00' },
  ]

  const handleStartTimeChange = (itemValue: string) => {
    setStartTime(itemValue)

    const startIndex = timeOptions.findIndex(
      (option) => option.value === itemValue,
    )
    const filteredOptions = timeOptions.slice(startIndex + 1)
    setEndTime(filteredOptions[0].value)
  }

  const handleCreateJob = async () => {
    const phoneValidation = phoneSchema.safeParse(contact)
    const valueValidation = valueSchema.safeParse(value)
    const descriptionValidation = descriptionSchema.safeParse(description)

    const hasContactError = !phoneValidation.success
    const hasValueError = !valueValidation.success
    const hasDescriptionError = !descriptionValidation.success

    if (hasContactError) {
      setContactError(phoneValidation.error.errors[0].message)
    } else {
      setContactError('')
    }

    if (hasValueError) {
      setValueError(valueValidation.error.errors[0].message)
    } else {
      setValueError('')
    }

    if (hasDescriptionError) {
      setDescriptionError(descriptionValidation.error.errors[0].message)
    } else {
      setDescriptionError('')
    }

    if (!hasContactError && !hasValueError && !hasDescriptionError) {
      const body = {
        days_of_week: daysOfWeek,
        contact,
        value: Number(value),
        description,
        duration,
        start_time: startTime,
        end_time: endTime,
        tasker: Number(user?.tasker),
        category: Number(category),
      }

      clear()

      await mutateAsync(body)
    }
  }

  useEffect(() => {
    if (isSuccess) {
      navigation.navigate('Home')
    }
  }, [isSuccess, navigation])

  if (isPending) {
    return <Loading />
  }

  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Telefone para Contato</Text>
          <MaskInput
            style={styles.input}
            value={contact}
            onChangeText={(masked) => {
              setContact(masked)
            }}
            mask={[
              '(',
              /\d/,
              /\d/,
              ')',
              ' ',
              /\d/,
              /\d/,
              /\d/,
              /\d/,
              /\d/,
              '-',
              /\d/,
              /\d/,
              /\d/,
              /\d/,
            ]}
          />
          {contactError ? (
            <Text style={styles.errorText}>{contactError}</Text>
          ) : null}
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Valor por Hora</Text>
          <TextInput
            style={styles.input}
            value={String(value)}
            onChangeText={(e) => {
              setValue(Number(e))
            }}
            placeholder="Digite o valor por hora"
            keyboardType="numeric"
          />
          {valueError ? (
            <Text style={styles.errorText}>{valueError}</Text>
          ) : null}
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Descrição do Serviço</Text>
          <TextInput
            style={styles.input}
            value={description}
            onChangeText={setDescription}
            placeholder="Digite a descrição do serviço"
            multiline
          />
          {descriptionError ? (
            <Text style={styles.errorText}>{descriptionError}</Text>
          ) : null}
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Categoria</Text>
          <Picker
            selectedValue={category}
            onValueChange={(itemValue) => setCategory(itemValue)}
            style={styles.picker}
          >
            {categories?.map((category) => (
              <Picker.Item
                key={category.id}
                label={category.name}
                value={category.id}
              />
            ))}
          </Picker>
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Duração Média</Text>
          <Picker
            selectedValue={duration}
            onValueChange={(itemValue) => setDuration(itemValue as string)}
            style={styles.picker}
          >
            <Picker.Item label="30 minutos" value="0hr30min" />
            <Picker.Item label="1 hora" value="1hr00min" />
            <Picker.Item label="1 hora e 30 minutos" value="1hr30min" />
            <Picker.Item label="2 horas" value="2hr00min" />
            <Picker.Item label="2 horas e 30 minutos" value="2hr30min" />
            <Picker.Item label="3 horas" value="3hr00min" />
            <Picker.Item label="3 horas e 30 minutos" value="3hr30min" />
            <Picker.Item label="4 horas" value="4hr00min" />
          </Picker>
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Horário de Início</Text>
          <Picker
            selectedValue={startTime}
            onValueChange={handleStartTimeChange}
            style={styles.picker}
          >
            {timeOptions.map((option, index) => (
              <Picker.Item
                key={index}
                label={option.label}
                value={option.value}
              />
            ))}
          </Picker>
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Horário de Término</Text>
          <Picker
            selectedValue={endTime}
            onValueChange={(itemValue) => setEndTime(itemValue as string)}
            style={styles.picker}
            enabled={startTime !== '00:00:00'}
          >
            {timeOptions
              .slice(
                timeOptions.findIndex((option) => option.value === startTime) +
                  1,
              )
              .map((option, index) => (
                <Picker.Item
                  key={index}
                  label={option.label}
                  value={option.value}
                />
              ))}
          </Picker>
        </View>
        <View style={styles.profileTypeContainer}>
          {[
            'Domingo',
            'Segunda',
            'Terça',
            'Quarta',
            'Quinta',
            'Sexta',
            'Sábado',
          ].map((day, index) => (
            <View
              key={index}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: 10,
              }}
            >
              <Text style={{ flex: 1 }}>{day}</Text>
              <Switch
                value={daysOfWeek[index]}
                onValueChange={(value) => {
                  const updatedDaysOfWeek = [...daysOfWeek]
                  updatedDaysOfWeek[index] = value
                  setDaysOfWeek(updatedDaysOfWeek)
                }}
              />
            </View>
          ))}
        </View>

        <TouchableOpacity style={styles.loginButton} onPress={handleCreateJob}>
          <Text style={styles.loginButtonText}>Criar Serviço</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: 10,
  },
  picker: {
    height: 50,
    width: 250,
  },
  inputGroup: {
    width: '90%',
    marginBottom: 15,
  },
  label: {
    color: '#2b2b2b',
    marginBottom: 5,
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  loginButton: {
    width: '90%',
    padding: 15,
    backgroundColor: '#0000FF',
    borderRadius: 20,
    alignItems: 'center',
    marginBottom: 10,
  },
  loginButtonText: {
    color: '#FFFFFF',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
  },
  profileTypeContainer: {
    width: '90%',
    paddingHorizontal: 10,
    marginBottom: 10,
  },
})
