import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { AuthProvider } from './src/contexts/AuthContext';
import { RootStackParamList } from './src/@types/navigation';
import { Router } from './router';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <AuthProvider>
      <Router />
    </AuthProvider>
  );
}
