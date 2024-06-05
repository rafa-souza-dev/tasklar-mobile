import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { AuthProvider, useAuth } from './src/contexts/AuthContext';
import { Login } from './src/screens/Login';
import { Home } from './src/screens/Home';
import { Register } from './src/screens/Register';
import { RootStackParamList } from './src/@types/navigation';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <AuthProvider>
      <Layout />
    </AuthProvider>
  );
}

function Layout() {
  const { authState } = useAuth();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {authState?.authenticated ?
          <Stack.Screen name='Home' component={Home} /> :
          (
            <>
              <Stack.Screen name='Login' component={Login} />
              <Stack.Screen name='Register' component={Register} />
            </>
          )
        }
      </Stack.Navigator>
    </NavigationContainer>
  )
}
