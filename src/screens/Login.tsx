import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import { z } from 'zod';

import { useAuth } from '../contexts/AuthContext';

const emailSchema = z.string().email({ message: "Email inválido" });
const passwordSchema = z.string().min(8, { message: "A senha deve ter pelo menos 8 caracteres" })
  .regex(/[A-Z]/, { message: "A senha deve conter pelo menos uma letra maiúscula" })
  .regex(/[a-z]/, { message: "A senha deve conter pelo menos uma letra minúscula" })
  .regex(/[0-9]/, { message: "A senha deve conter pelo menos um número" })
  .regex(/[^a-zA-Z0-9]/, { message: "A senha deve conter pelo menos um caractere especial" });

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const { onLogin } = useAuth();

  const handleLogin = () => {
    const emailValidation = emailSchema.safeParse(email);
    const passwordValidation = passwordSchema.safeParse(password);

    // if (!emailValidation.success) {
    //   setEmailError(emailValidation.error.errors[0].message);
    // } else {
    //   setEmailError('');
    // }

    // if (!passwordValidation.success) {
    //   setPasswordError(passwordValidation.error.errors[0].message);
    // } else {
    //   setPasswordError('');
    // }

    console.log(email)
    console.log(password)

    onLogin!(email, password);
  };

  return (
    <View style={styles.container}>
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
      {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
      
      <Button title="Entrar" onPress={handleLogin} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 8,
    paddingHorizontal: 8,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 8,
  },
});
