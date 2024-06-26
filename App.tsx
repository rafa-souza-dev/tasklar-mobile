import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { AuthProvider } from './src/contexts/AuthContext'
import { Router } from './router'

const queryClient = new QueryClient()

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router />
      </AuthProvider>
    </QueryClientProvider>
  )
}
