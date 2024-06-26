import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'
import * as SecureStore from 'expo-secure-store'

import { client } from '../client'

interface AuthProps {
  authState: { token: string | null; authenticated: boolean | null }
  onRegister: (email: string, password: string) => Promise<any>
  onLogin: (email: string, password: string) => Promise<any>
  onLogout: () => Promise<any>
}

const TOKEN_KEY = 'my-jwt'
const AuthContext = createContext<AuthProps>({} as AuthProps)

export const useAuth = () => useContext(AuthContext)

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [authState, setAuthState] = useState<{
    token: string | null
    authenticated: boolean | null
  }>({
    token: null,
    authenticated: null,
  })

  useEffect(() => {
    const loadToken = async () => {
      const token = await SecureStore.getItemAsync(TOKEN_KEY)

      if (token) {
        client.defaults.headers.common.Authorization = `Bearer ${token}`

        setAuthState({
          token,
          authenticated: true,
        })
      }
    }

    loadToken()
  }, [])

  const register = async (email: string, password: string) => {
    try {
      return await client.post(`/users/`, { email, password })
    } catch (e) {
      return { error: true, msg: (e as any).response.data.msg }
    }
  }

  const login = async (email: string, password: string) => {
    try {
      const result = await client.post(`/sessions/`, { email, password })
      const token = result.data.access

      setAuthState({
        token,
        authenticated: true,
      })

      client.defaults.headers.common.Authorization = `Bearer ${token}`

      await SecureStore.setItemAsync(TOKEN_KEY, token)

      return result.data
    } catch (e) {
      return { error: true, msg: (e as any).response.data.msg }
    }
  }

  const logout = async () => {
    await SecureStore.deleteItemAsync(TOKEN_KEY)

    client.defaults.headers.common.Authorization = ''

    setAuthState({
      token: null,
      authenticated: null,
    })
  }

  const value = {
    onRegister: register,
    onLogin: login,
    onLogout: logout,
    authState,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
