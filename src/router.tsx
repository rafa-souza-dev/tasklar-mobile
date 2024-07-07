/* eslint-disable jsx-a11y/alt-text */
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Image, View } from 'react-native'
import { RootStackParamList, RootTabsParamList } from './@types/navigation'
import { useAuth } from './contexts/AuthContext'
import Login from './screens/Login'
import { Register } from './screens/Register'
import { Profile } from './screens/Profile'
import { Home } from './screens/Home'
import { TaskerDetails } from './screens/TaskerDetails'
import { TaskerFilterDialog } from './modules/taskers/TaskerFilterDialog'
import { TaskerFilterProvider } from './modules/taskers/TaskerFilterContext'

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
              source={require('../assets/home-white.png')}
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
              source={require('../assets/profile-white.png')}
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
    <TaskerFilterProvider>
      <Stack.Navigator>
        <Stack.Screen
          name="TaskerList"
          component={Home}
          options={{
            title: 'Encontre Prestadores',
            headerRight: () => (
              <View>
                <TaskerFilterDialog />
              </View>
            ),
          }}
        />
        <Stack.Screen
          name="TaskerDetails"
          component={TaskerDetails}
          options={{ title: 'Detalhes do Prestador' }}
        />
      </Stack.Navigator>
    </TaskerFilterProvider>
  )
}

function tintColor(focused: boolean) {
  const color = focused ? focusedColor : unfocusedColor

  return color
}
