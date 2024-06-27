import React, { useState } from 'react'
import { View, TextInput, TouchableOpacity, StyleSheet, Text } from 'react-native'
import { z } from 'zod'

import { useAuth } from '../contexts/AuthContext'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { RootStackParamList } from '../@types/navigation'

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

export function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const { onLogin } = useAuth()
  const navigation = useNavigation<NavigationProp<RootStackParamList>>()

  const handleLogin = () => {
    const emailValidation = emailSchema.safeParse(email)
    const passwordValidation = passwordSchema.safeParse(password)

    if (!emailValidation.success) {
      setEmailError(emailValidation.error.errors[0].message)
    } else {
      setEmailError('')
    }

    if (!passwordValidation.success) {
      setPasswordError(passwordValidation.error.errors[0].message)
    } else {
      setPasswordError('')
    }

    onLogin!(email, password)
  }

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Bem-vindo!</Text>
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
        {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
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
        {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
      </View>
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Entrar</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.signupButton}
        onPress={() => {
          navigation.navigate('Register')
        }}
      >
        <Text style={styles.signupButtonText}>Criar conta</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text style={styles.forgotPassword}>Esqueceu sua senha?</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: 20,
  },
  welcomeText: {
    fontSize: 24,
    marginBottom: 20,
    color: '#2b2b2b',
  },
  inputGroup: {
    width: '100%',
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
    width: '100%',
    padding: 15,
    backgroundColor: '#0000FF',
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  loginButtonText: {
    color: '#FFFFFF',
  },
  signupButton: {
    width: '100%',
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 5,
    alignItems: 'center',
    borderColor: '#0000FF',
    borderWidth: 2,
    marginBottom: 10,
  },
  signupButtonText: {
    color: '#0000FF',
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
})

export default Login;
