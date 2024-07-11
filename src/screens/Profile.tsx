import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';


import { useAuth } from '../contexts/AuthContext'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { RootStackParamList } from '../@types/navigation'



interface UserProfile {
  name: string;
  location: string;
  email: string;
  profession: string;
}

export function Profile() {
  const { onLogout } = useAuth();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>()
  const [profile, setProfile] = useState<UserProfile | null>(null);

// useEffect(() => {
//    axios.get('/whoami/')
//      .then(response => {
//        setProfile(response.data);
//      })
 //     .catch(error => {
//        console.error('Error fetching profile data:', error);
 //     });
//  }, []);

//  if (!profile) {
//    return (
//      <View style={styles.container}>
//        <Text>Loading...</Text>
//      </View>
//    );
//  }

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <Image
          source={{ uri: 'https://via.placeholder.com/150' }}
          style={styles.profileImage}
        />
        <Text style={styles.name}>name</Text>
        <Text style={styles.location}>location</Text>
        <Text style={styles.email}>email</Text>
        <Text style={styles.profession}>profession</Text>
      </View>
      
      <TouchableOpacity 
        style={styles.button} 
        onPress={() => navigation.navigate('EditProfile')}
      >
        <Text style={styles.buttonText}>Editar Perfil</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={styles.button} 
        onPress={() => navigation.navigate('EditServices')}
      >
        <Text style={styles.buttonText}>Editar Serviços</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={styles.button} 
        onPress={() => navigation.navigate('RequestedProposals')}
      >
        <Text style={styles.buttonText}>Propostas Solicitadas</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={styles.button} 
        onPress={() => navigation.navigate('Appointments')}
      >
        <Text style={styles.buttonText}>Agendamentos</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.logoutButton} onPress={onLogout}>
        <Text style={styles.logoutButtonText}>Sair</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFFFFF'
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 32
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  location: {
    fontSize: 16,
    color: '#666666'
  },
  email: {
    fontSize: 16,
    color: '#666666',
    marginTop: 8
  },
  profession: {
    fontSize: 16,
    color: '#666666',
    marginTop: 8
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
    marginVertical: 8
  },
  logoutButtonText: {
    color: '#FF0000',
  }
});
