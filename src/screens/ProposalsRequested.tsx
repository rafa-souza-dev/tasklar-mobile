/* eslint-disable jsx-a11y/alt-text */
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { useState } from 'react'

import { ProposalDetailsDialog } from './ProposalDetailsDialog'
import { useWhoami } from '../modules/users/stores'
import { useServicesByTasker } from '../modules/services/stores'
import { Loading } from '../components/Loading'
import { format } from 'date-fns'

export function ProposalsRequested() {
  const [modalVisible, setModalVisible] = useState(false)
  const { data: user, isLoading: isUserLoading } = useWhoami()
  const taskerId = user?.tasker
  const { data: services, isLoading: isServicesLoading } = useServicesByTasker(
    taskerId!,
  )
  const isLoading = isUserLoading || isServicesLoading

  if (isLoading) {
    return <Loading />
  }

  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={styles.container}>
        {services?.map((service) => (
          <View style={styles.card} key={service.id}>
            <Text style={styles.title}>{service.consumer.user.name}</Text>

            <View style={styles.cardMain}>
              <View style={styles.cardDetails}>
                <Text
                  style={styles.descriptionText}
                >{`${format(new Date(service.date), 'dd/MM/yyyy')} - ${service.time.slice(0, 5)} horas`}</Text>
                <Text style={styles.descriptionText}>
                  Serviço - {service.job.category.name}
                </Text>
              </View>

              <TouchableOpacity>
                <Image
                  source={require('../../assets/chat-icon.png')}
                  style={{ width: 32 }}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.cardFooter}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  setModalVisible((prevState) => !prevState)
                }}
              >
                <Text style={styles.buttonText}>Detalhar</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.buttonRefused}>
                <Text style={styles.buttonText}>Recusar</Text>
              </TouchableOpacity>

              <ProposalDetailsDialog
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                service={service}
              />
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    gap: 32,
  },
  card: {
    width: '100%',
    gap: 10,
    paddingHorizontal: 32,
  },
  title: {
    color: '#233DFF',
    fontSize: 26,
    fontWeight: '700',
  },
  cardMain: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardDetails: {
    gap: 4,
  },
  cardFooter: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 14,
  },
  button: {
    backgroundColor: '#12229D',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 24,
    width: 120,
    height: 40,
  },
  buttonRefused: {
    backgroundColor: '#DB0606',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 24,
    width: 120,
    height: 40,
  },
  buttonText: {
    fontSize: 16,
    color: 'white',
    fontWeight: '600',
  },
  descriptionText: {
    fontSize: 16,
  },
})
