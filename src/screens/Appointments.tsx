import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Dados mockados
const mockAppointments = [
  {
    id: 1,
    name: "Ike. H",
    date: "06/06/23",
    time: "13h",
    service: "Encanador",
    status: "Aceito",
    image: "https://via.placeholder.com/50" // substitua pela URL real da imagem
  },
  {
    id: 2,
    name: "Ike. H",
    date: "24/06/23",
    time: "17h",
    service: "Eletricista",
    status: "Pendente",
    image: "https://via.placeholder.com/50" // substitua pela URL real da imagem
  },
  {
    id: 3,
    name: "Ike. H",
    date: "24/06/23",
    time: "17h",
    service: "Eletricista",
    status: "Recusado",
    image: "https://via.placeholder.com/50" // substitua pela URL real da imagem
  }
];

export default function Appointments() {
  const navigation = useNavigation();
  const [appointments, setAppointments] = useState(mockAppointments);

  useEffect(() => {
    // Simulando a chamada de API com dados mockados
    setAppointments(mockAppointments);
  }, []);

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'Aceito':
        return styles.accepted;
      case 'Pendente':
        return styles.pending;
      case 'Recusado':
        return styles.rejected;
      default:
        return {};
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Meus Agendamentos</Text>
      {appointments.map(appointment => (
        <View key={appointment.id} style={styles.card}>
          <Image source={{ uri: appointment.image }} style={styles.image} />
          <View style={styles.details}>
            <Text style={styles.name}>{appointment.name}</Text>
            <Text style={styles.date}>{appointment.date} - {appointment.time}</Text>
            <Text style={styles.service}>Serviço - {appointment.service}</Text>
            <View style={[styles.status, getStatusStyle(appointment.status)]}>
              <Text style={styles.statusText}>{appointment.status}</Text>
            </View>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0057FF',
    textAlign: 'center',
    marginVertical: 16,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#F9F9F9',
    borderRadius: 8,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 16,
  },
  details: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  date: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  service: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  status: {
    alignSelf: 'flex-start',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  statusText: {
    fontSize: 14,
    color: '#FFFFFF',
  },
  accepted: {
    backgroundColor: '#0057FF',
  },
  pending: {
    backgroundColor: '#FFD700',
  },
  rejected: {
    backgroundColor: '#FF0000',
  },
});
