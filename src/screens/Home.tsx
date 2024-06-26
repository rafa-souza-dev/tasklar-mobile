import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import { useAuth } from '../contexts/AuthContext'
import { TaskerList } from '../modules/taskers/TaskerList'

export function Home() {
  const { onLogout } = useAuth()

  return (
    <View style={styles.container}>
      <Text>Home</Text>
      <TouchableOpacity onPress={onLogout} style={{ backgroundColor: 'blue' }}>
        <Text>Logout</Text>
      </TouchableOpacity>
      <TaskerList />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
