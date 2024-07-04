import { useEffect, useState } from 'react'
import { View, TextInput, Button, StyleSheet, Text, ScrollView, TouchableOpacity } from 'react-native'
import { SelectList } from 'react-native-dropdown-select-list'
import { CheckBox } from 'react-native-elements'
import { z } from 'zod'
import { useAuth } from '../contexts/AuthContext'

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
const nameSchema = z.string().min(1, { message: 'Nome completo é obrigatório' })

interface Category {
  key: number;
  value: string;
}


export function Register() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [nameError, setNameError] = useState('')
  const [estadoUf, setEstadoUf] = useState('')
  const [cidade, setCidade] = useState('')
  const [phone, setPhone] = useState('')
  const [isTasker, setIsTasker] = useState(false)
  const [category, setCategory] = useState<Category | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [periods, setPeriods] = useState('')
  const [hourlyRate, setHourlyRate] = useState('')
  const [description, setDescription] = useState('')

  const { onRegister, onLogin } = useAuth()


  useEffect(() => {
    fetch('http://localhost:8000/api/categories/')
      .then(response => response.json())
      .then(data => {
        const categoryOptions = data.results.map((category: { id: number, name: string }) => ({
          key: category.id,
          value: category.name,
        }));
        setCategories(categoryOptions);
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
      });
  }, []);

  const handleSignup = async () => {
    const emailValidation = emailSchema.safeParse(email)
    const passwordValidation = passwordSchema.safeParse(password)
    const nameValidation = nameSchema.safeParse(name)

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

    if (!nameValidation.success) {
      setNameError(nameValidation.error.errors[0].message)
    } else {
      setNameError('')
    }

    if (emailValidation.success && passwordValidation.success && nameValidation.success) {
      const data = {
        name: name,
        email: email,
        uf: estadoUf,
        city: cidade,
        password: password,
        ...(isTasker && {
          tasker: {
            category: category,
            periods: [parseInt(periods)],
            phone: phone,
            hourly_rate: hourlyRate,
            description: description
          }
        })
      }

      await onRegister(data.email, data.password)

      onLogin(email, password)
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>Nome Completo</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Digite seu nome completo"
        autoCapitalize="words"
      />
      {nameError ? <Text style={styles.errorText}>{nameError}</Text> : null}

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

      <Text style={styles.label}>Estado (UF)</Text>
      <TextInput
        style={styles.input}
        value={estadoUf}
        onChangeText={setEstadoUf}
        placeholder="Digite seu estado (UF)"
        autoCapitalize="characters"
      />

      <Text style={styles.label}>Cidade</Text>
      <TextInput
        style={styles.input}
        value={cidade}
        onChangeText={setCidade}
        placeholder="Digite sua cidade"
        autoCapitalize="words"
      />

      <Text style={styles.label}>Telefone</Text>
      <TextInput
        style={styles.input}
        value={phone}
        onChangeText={setPhone}
        placeholder="Digite seu telefone"
        keyboardType="phone-pad"
      />

      <CheckBox
        title="Registrar como Tasker"
        checked={isTasker}
        onPress={() => setIsTasker(!isTasker)}
      />

      {isTasker && (
        <>
          <Text style={styles.label}>Categoria</Text>
          <SelectList
            setSelected={setCategory}
            data={categories}
            placeholder="Selecione a categoria"
            boxStyles={styles.dropdown}
          />

          <Text style={styles.label}>Períodos</Text>
          <TextInput
            style={styles.input}
            value={periods}
            onChangeText={setPeriods}
            placeholder="Digite os períodos"
            keyboardType="numeric"
          />

          <Text style={styles.label}>Taxa por Hora</Text>
          <TextInput
            style={styles.input}
            value={hourlyRate}
            onChangeText={setHourlyRate}
            placeholder="Digite a taxa por hora"
            keyboardType="numeric"
          />

          <Text style={styles.label}>Descrição</Text>
          <TextInput
            style={styles.input}
            value={description}
            onChangeText={setDescription}
            placeholder="Digite a descrição"
          />
        </>
      )}

      <View style={styles.buttonContainer}>
      <TouchableOpacity style={styles.registerButton} onPress={handleSignup}>
        <Text>Criar Conta</Text>
      </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#0000FF'
  },
  input: {
    height: 40,
    borderRadius: 5,
    borderWidth: 1,
    marginBottom: 8,
    paddingHorizontal: 8,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 8,
  },
  buttonContainer: {
    marginTop: 16,
    borderRadius: 20,
    overflow: 'hidden',
  },
  button: {
    padding: 8,
    backgroundColor: '#0000FF',
  },
  registerButton: {
    padding: 8,
    backgroundColor: '#0000FF',
    alignItems: 'center',
    borderRadius: 20,
    overflow: 'hidden',
  },
  dropdown: {
    height: 40,
    borderRadius: 20,
    borderColor: '#0000FF',
    borderWidth: 1,
    marginBottom: 8,
  },
})

export default Register;
