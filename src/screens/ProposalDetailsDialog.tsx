import { Modal, StyleSheet, Text, Pressable, View } from 'react-native'
import { ServiceFull } from '../modules/services/types'

type ProposalDetailsDialogProps = {
  modalVisible?: boolean
  setModalVisible: (isVisible: boolean) => void
  service: ServiceFull
}

export function ProposalDetailsDialog({
  setModalVisible,
  modalVisible,
  service,
}: ProposalDetailsDialogProps) {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible)
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={{ alignItems: 'flex-start' }}>
            <Text style={styles.modalText}>{service.consumer.user.name}</Text>
            <Text
              style={styles.modalText}
            >{`${service.city} - ${service.neighborhood}`}</Text>
          </View>

          <Text style={{ ...styles.modalText, textAlign: 'auto' }}>
            {service.request_description}
          </Text>

          <View style={{ gap: 8 }}>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Aceitar</Text>
            </Pressable>

            <Pressable
              style={[styles.buttonRefused]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Fechar</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonRefused: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    backgroundColor: '#DB0606',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 16,
  },
})
