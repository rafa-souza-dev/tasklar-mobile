import { View, ActivityIndicator, StyleSheet } from 'react-native'

export function Loading() {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#FFFFFF" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#12229D',
    justifyContent: 'center',
    alignItems: 'center',
  },
})
