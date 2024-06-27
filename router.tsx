/* eslint-disable jsx-a11y/alt-text */
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Image } from 'react-native'

import { useAuth } from './src/contexts/AuthContext'
import { Home } from './src/screens/Home/Home'
import { Register } from './src/screens/Register/Register'
import Login from './src/screens/Login'
import { Profile } from './src/screens/Profile'

const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()

export function Router() {
  const { authState } = useAuth()

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {authState?.authenticated ? (
          <Stack.Screen
            name="Tabs"
            component={BottomTabs}
            options={{ headerShown: false }}
          />
        ) : (
          <>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  )
}

function BottomTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        options={{
          tabBarStyle: {
            backgroundColor: '#12229D',
            borderTopColor: 'transparent',
          },
          tabBarShowLabel: false,
          tabBarIcon: () => (
            <Image source={require('./assets/home-white.png')} />
          ),
        }}
        name="Home"
        component={Home}
      />

      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarStyle: {
            backgroundColor: '#12229D',
            borderTopColor: 'transparent',
          },
          tabBarShowLabel: false,
          tabBarIcon: () => (
            <Image source={require('./assets/profile-white.png')} />
          ),
        }}
      />
    </Tab.Navigator>
  )
}
