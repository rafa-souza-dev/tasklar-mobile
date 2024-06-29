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
import { RootStackParamList, RootTabsParamList } from './src/@types/navigation'
import { TaskerDetails } from './src/screens/TaskerDetails'

const Stack = createNativeStackNavigator<RootStackParamList>()
const Tab = createBottomTabNavigator<RootTabsParamList>()

const focusedColor = '#FF7F50'
const unfocusedColor = '#FFFFFF'

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
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: '#12229D',
          borderTopColor: 'transparent',
        },
        tabBarShowLabel: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={TaskerStack}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Image
              source={require('./assets/home-white.png')}
              style={{ tintColor: tintColor(focused) }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={require('./assets/profile-white.png')}
              style={{ tintColor: tintColor(focused) }}
            />
          ),
        }}
      />
    </Tab.Navigator>
  )
}

function TaskerStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="TaskerList"
        component={Home}
        options={{ title: 'Encontre Prestadores' }}
      />
      <Stack.Screen
        name="TaskerDetails"
        component={TaskerDetails}
        options={{ title: 'Detalhes do Prestador' }}
      />
    </Stack.Navigator>
  )
}

function tintColor(focused: boolean) {
  const color = focused ? focusedColor : unfocusedColor

  return color
}
