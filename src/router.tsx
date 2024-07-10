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
import { JobFilterDialog } from './modules/jobs/JobFilterDialog'
import { JobFilterProvider } from './modules/jobs/JobFilterContext'
import { JobDetails } from './screens/JobDetails'

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
        component={JobStack}
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

function JobStack() {
  return (
    <JobFilterProvider>
      <Stack.Navigator>
        <Stack.Screen
          name="JobList"
          component={Home}
          options={{
            title: 'Encontre Prestadores',
            headerRight: () => (
              <View>
                <JobFilterDialog />
              </View>
            ),
          }}
        />
        <Stack.Screen
          name="JobDetails"
          component={JobDetails}
          options={{ title: 'Detalhes do Prestador' }}
        />
      </Stack.Navigator>
    </JobFilterProvider>
  )
}

function tintColor(focused: boolean) {
  const color = focused ? focusedColor : unfocusedColor

  return color
}
