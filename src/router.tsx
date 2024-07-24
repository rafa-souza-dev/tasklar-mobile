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
import Appointments from './screens/Appointments'
import ServiceProviderSchedule from './screens/ServiceProviderSchedule'
import { CreateJob } from './screens/CreateJob'
import { JobContract } from './screens/JobContract'
import { useWhoami } from './modules/users/stores'
import { Loading } from './components/Loading'
import { ProposalsRequested } from './screens/ProposalsRequested'

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
  const { data: user, isLoading } = useWhoami()

  if (isLoading) {
    return <Loading />
  }

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
      {user?.profile_type === 'T' && (
        <Tab.Screen
          name="CreateJob"
          component={CreateJob}
          options={{
            title: 'Crie seu serviço',
            tabBarIcon: ({ focused }) => (
              <Image
                source={require('../assets/add-job-icon.png')}
                style={{ tintColor: tintColor(focused) }}
              />
            ),
          }}
        />
      )}
      <Tab.Screen
        name="ProfileStack"
        component={ProfileStack}
        options={{
          headerTitle: 'Meu Perfil',
          headerShown: false,
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
        <Stack.Screen
          name="JobContract"
          component={JobContract}
          options={{ title: 'Contrate o Prestador' }}
        />
      </Stack.Navigator>
    </JobFilterProvider>
  )
}

function ProfileStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{
          title: 'Meu Perfil',
        }}
      />
      <Stack.Screen
        name="Appointments"
        component={Appointments}
        options={{ title: 'Agendamentos' }}
      />
      <Stack.Screen
        name="ServiceProviderSchedule"
        component={ServiceProviderSchedule}
        options={{ title: 'Agendamentos' }}
      />
      <Stack.Screen
        name="ProposalsRequested"
        component={ProposalsRequested}
        options={{ title: 'Solicitações' }}
      />
    </Stack.Navigator>
  )
}

function tintColor(focused: boolean) {
  const color = focused ? focusedColor : unfocusedColor

  return color
}
