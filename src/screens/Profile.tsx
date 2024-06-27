import { TouchableOpacity, View, Text } from 'react-native'
import { useAuth } from '../contexts/AuthContext'

export function Profile() {
  const { onLogout } = useAuth()

  return (
    <View>
      <TouchableOpacity onPress={onLogout}>
        <Text>Logout</Text>
      </TouchableOpacity>
    </View>
  )
}
