import React, { useState } from 'react'
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
import { cities, states } from '../modules/jobs/mock'
import { StateAbbreviation } from '../modules/jobs/types'
import MaskInput from 'react-native-mask-input'
import { useAuth } from '../contexts/AuthContext'
import { Loading } from '../components/Loading'

const emailSchema = z.string().email({ message: 'Email inválido' })
const passwordSchema = z
  .string()
  .min(8, { message: 'A senha deve ter pelo menos 8 caracteres' })
  .regex(/[A-Z]/, {
    message: 'A senha deve conter pelo menos uma letra maiúscula',
  })
  .regex(/[a-z]/, {
    message: 'A senha deve conter pelo menos uma letra minúscula',
  })
  .regex(/[0-9]/, { message: 'A senha deve conter pelo menos um número' })
  .regex(/[^a-zA-Z0-9]/, {
    message: 'A senha deve conter pelo menos um caractere especial',
  })

const nameSchema = z.string().min(1, { message: 'Nome inválido' })
const phoneSchema = z.string().regex(/^\(\d{2}\) \d{5}-\d{4}$/, {
  message: 'Telefone inválido, use o formato (99) 99999-9999',
})
const stateSchema = z.string().min(1, { message: 'Selecione um estado' })
const citySchema = z.string().min(1, { message: 'Selecione uma cidade' })

export function Register() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [isJob, setIsJob] = useState(false)
  const toggleSwitch = () => setIsJob((previousState) => !previousState)
  const [selectedState, setSelectedState] = useState<
    StateAbbreviation | undefined
  >(undefined)
  const [selectedCity, setSelectedCity] = useState<string | undefined>(
    undefined,
  )
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [nameError, setNameError] = useState('')
  const [phoneError, setPhoneError] = useState('')
  const [stateError, setStateError] = useState('')
  const [cityError, setCityError] = useState('')
  const navigation = useNavigation<NavigationProp<RootStackParamList>>()
  const { onRegister } = useAuth()
  const [isLoading, setIsLoading] = useState(false)

  const handleRegister = async () => {
    const emailValidation = emailSchema.safeParse(email)
    const passwordValidation = passwordSchema.safeParse(password)
    const nameValidation = nameSchema.safeParse(name)
    const phoneValidation = phoneSchema.safeParse(phone)
    const stateValidation = stateSchema.safeParse(selectedState)
    const cityValidation = citySchema.safeParse(selectedCity)

    const hasEmailError = !emailValidation.success
    const hasPasswordError = !passwordValidation.success
    const hasNameError = !nameValidation.success
    const hasPhoneError = !phoneValidation.success
    const hasStateError = !stateValidation.success
    const hasCityError = !cityValidation.success

    if (hasEmailError) {
      setEmailError(emailValidation.error.errors[0].message)
    } else {
      setEmailError('')
    }

    if (hasPasswordError) {
      setPasswordError(passwordValidation.error.errors[0].message)
    } else {
      setPasswordError('')
    }

    if (hasNameError) {
      setNameError(nameValidation.error.errors[0].message)
    } else {
      setNameError('')
    }

    if (hasPhoneError) {
      setPhoneError(phoneValidation.error.errors[0].message)
    } else {
      setPhoneError('')
    }

    if (hasStateError) {
      setStateError(stateValidation.error.errors[0].message)
    } else {
      setStateError('')
    }

    if (hasCityError) {
      setCityError(cityValidation.error.errors[0].message)
    } else {
      setCityError('')
    }

    if (
      !hasEmailError &&
      !hasPasswordError &&
      !hasNameError &&
      !hasPhoneError &&
      !hasStateError &&
      !hasCityError
    ) {
      const body = {
        email,
        password,
        name,
        uf: String(selectedState),
        city: String(selectedCity),
        phone,
        profile_type: isJob ? 'T' : 'C',
      }

      setIsLoading(true)

      await onRegister(body)

      setIsLoading(false)

      navigation.navigate('Login')
    }
  }

  if (isLoading) {
    return <Loading />
  }

  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Text style={styles.welcomeText}>Crie sua Conta</Text>
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="Digite seu email"
            keyboardType="email-address"
            autoCapitalize="none"
          />
          {emailError ? (
            <Text style={styles.errorText}>{emailError}</Text>
          ) : null}
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Nome</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Digite seu nome"
            autoCapitalize="words"
          />
          {nameError ? <Text style={styles.errorText}>{nameError}</Text> : null}
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Telefone</Text>
          <MaskInput
            style={styles.input}
            value={phone}
            onChangeText={(masked) => {
              setPhone(masked)
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
          {phoneError ? (
            <Text style={styles.errorText}>{phoneError}</Text>
          ) : null}
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Senha</Text>
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            placeholder="Digite sua senha"
            secureTextEntry
            autoCapitalize="none"
          />
          {passwordError ? (
            <Text style={styles.errorText}>{passwordError}</Text>
          ) : null}
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>UF</Text>
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
          {stateError ? (
            <Text style={styles.errorText}>{stateError}</Text>
          ) : null}
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Cidade</Text>
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
          {cityError ? <Text style={styles.errorText}>{cityError}</Text> : null}
        </View>
        <View style={styles.profileTypeContainer}>
          <Switch
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={isJob ? '#12229D' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isJob}
            style={{ transform: [{ scaleX: 1.3 }, { scaleY: 1.3 }] }}
          />
          <Text style={styles.profileLabel}>Sou prestador de serviços</Text>
        </View>
        <TouchableOpacity style={styles.loginButton} onPress={handleRegister}>
          <Text style={styles.loginButtonText}>Cadastrar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Login')
          }}
        >
          <Text style={styles.forgotPassword}>Já possuo cadastro</Text>
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
  textContainer: {
    alignSelf: 'flex-start',
    marginHorizontal: 20,
  },
  welcomeText: {
    fontSize: 24,
    marginBottom: 20,
    color: '#0000FF',
    alignSelf: 'flex-start',
  },
  inputGroup: {
    width: '90%',
    marginBottom: 15,
  },
  label: {
    color: '#2b2b2b',
    marginBottom: 5,
  },
  profileLabel: {
    color: '#2b2b2b',
    marginBottom: 5,
    fontSize: 16,
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
  toggleButton: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    alignItems: 'center',
  },
  toggleButtonText: {
    color: '#000',
  },
  forgotPassword: {
    color: '#0000FF',
    marginTop: 10,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
  },
  profileTypeContainer: {
    flexDirection: 'row',
    width: '90%',
    paddingHorizontal: 10,
    gap: 16,
    marginBottom: 10,
    alignItems: 'center',
  },
})
