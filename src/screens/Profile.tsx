/* eslint-disable jsx-a11y/alt-text */
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'

import { useAuth } from '../contexts/AuthContext'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { RootStackParamList } from '../@types/navigation'
import { useWhoami } from '../modules/users/stores'

export function Profile() {
  const { onLogout } = useAuth()
  const navigation = useNavigation<NavigationProp<RootStackParamList>>()
  const { data: user } = useWhoami()
  const istasker = user?.profile_type === 'T'

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <Image
          source={{ uri: 'https://via.placeholder.com/150' }}
          style={styles.profileImage}
        />
        <Text style={styles.name}>{user?.name}</Text>
        <Text style={styles.location}>{user?.city}</Text>
        <Text style={styles.email}>{user?.email}</Text>
        <Text style={styles.phone}>{user?.phone}</Text>
      </View>

      {istasker && (
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('ProposalsRequested')}
        >
          <Text style={styles.buttonText}>Propostas Solicitadas</Text>
        </TouchableOpacity>
      )}
      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          navigation.navigate(
            istasker ? 'ServiceProviderSchedule' : 'Appointments',
          )
        }
      >
        <Text style={styles.buttonText}>Agendamentos</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.logoutButton} onPress={onLogout}>
        <Text style={styles.logoutButtonText}>Sair</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFFFFF',
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  location: {
    fontSize: 16,
    color: '#666666',
  },
  email: {
    fontSize: 16,
    color: '#666666',
    marginTop: 8,
  },
  phone: {
    fontSize: 16,
    color: '#666666',
    marginTop: 8,
  },
  profession: {
    fontSize: 16,
    color: '#666666',
    marginTop: 8,
  },
  button: {
    width: '90%',
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 20,
    alignItems: 'center',
    borderColor: '#0000FF',
    borderWidth: 2,
    marginBottom: 10,
  },
  buttonText: {
    color: '#0000FF',
  },
  logoutButton: {
    width: '90%',
    padding: 15,
    borderRadius: 20,
    backgroundColor: 'white',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FF0000',
    marginVertical: 8,
  },
  logoutButtonText: {
    color: '#FF0000',
  },
})
