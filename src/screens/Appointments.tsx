/* eslint-disable jsx-a11y/alt-text */
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native'
import { useWhoami } from '../modules/users/stores'
import { useServicesByConsumer } from '../modules/services/stores'
import { Loading } from '../components/Loading'
import { format } from 'date-fns'

export default function Appointments() {
  const { data: user } = useWhoami()
  const { data: services, isFetching } = useServicesByConsumer(
    user?.consumer ?? 0,
  )
  const appointments = services?.map((service) => ({
    id: service.id,
    name: service.tasker.user.name,
    date: format(service.date, 'dd/MM/yyyy'),
    time: `${service.time.slice(0, 5)} horas`,
    service: service.job.category.name,
    status: service.status,
    statusLabel: getStatusLabel(service.status),
    image: 'https://via.placeholder.com/50',
  }))

  function getStatusStyle(status: string) {
    switch (status) {
      case 'accepted':
        return styles.accepted
      case 'pending':
        return styles.pending
      case 'rejected':
        return styles.rejected
      default:
        return styles.accepted
    }
  }

  function getStatusLabel(status: string) {
    switch (status) {
      case 'accepted':
        return 'Aceito'
      case 'pending':
        return 'Pendente'
      case 'rejected':
        return 'Rejeitado'
      default:
        return 'Aceito'
    }
  }

  if (isFetching) {
    return <Loading />
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Meus Agendamentos</Text>
      {appointments?.map((appointment) => (
        <View key={appointment.id} style={styles.card}>
          <Image source={{ uri: appointment.image }} style={styles.image} />
          <View style={styles.details}>
            <Text style={styles.name}>{appointment.name}</Text>
            <Text style={styles.date}>
              {appointment.date} - {appointment.time}
            </Text>
            <Text style={styles.service}>Serviço - {appointment.service}</Text>
            <View style={[styles.status, getStatusStyle(appointment.status)]}>
              <Text style={styles.statusText}>{appointment.statusLabel}</Text>
            </View>
          </View>
        </View>
      ))}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 24,
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
    fontWeight: '700',
  },
  accepted: {
    backgroundColor: 'rgb(76, 121, 211)',
  },
  pending: {
    backgroundColor: 'rgb(153, 142, 77)',
  },
  rejected: {
    backgroundColor: 'rgb(219, 71, 71)',
  },
})
