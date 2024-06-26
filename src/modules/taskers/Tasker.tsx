/* eslint-disable jsx-a11y/alt-text */
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'

export function Tasker() {
  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.main}>
        <View style={styles.taskerDetails}>
          <Image
            style={styles.image}
            source={require('../../../assets/favicon.png')}
          />
          <View style={styles.nameAndDescription}>
            <Text style={styles.name}>Isaac. O</Text>
            <Text style={styles.description}>
              I’m a UIUX Designer, this is one of my pro...
            </Text>
          </View>
        </View>
        <Image source={require('../../../assets/verify-icon.png')} />
      </View>

      <View style={styles.footer}>
        <View style={styles.rate}>
          <Image source={require('../../../assets/star-blue.png')} />
          <View style={styles.rateDetails}>
            <Text style={styles.rateValue}>5.0</Text>
            <Text style={styles.rateQuantity}>(24)</Text>
          </View>
        </View>

        <View style={styles.value}>
          <Text style={styles.valueTitle}>Valor por hora:</Text>
          <Text style={styles.valueBRL}>R$ 120,00</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 130,
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 16,
    justifyContent: 'space-between',
  },
  main: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  taskerDetails: {
    flexDirection: 'row',
    gap: 8,
  },
  nameAndDescription: {
    flexDirection: 'column',
    gap: 2,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  image: {
    borderRadius: 100,
    width: 50,
    height: 50,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#233DFF',
  },
  description: {
    fontSize: 16,
    color: '#233DFF',
    width: 200,
  },
  rate: {
    flexDirection: 'row',
    gap: 4,
    alignItems: 'center',
  },
  rateDetails: {
    flexDirection: 'row',
  },
  rateValue: {
    color: '#233DFF',
    fontSize: 16,
  },
  rateQuantity: {
    color: '#757B7C',
    fontSize: 16,
  },
  value: {
    flexDirection: 'row',
    gap: 4,
  },
  valueTitle: {
    color: '#757B7C',
    fontSize: 16,
  },
  valueBRL: {
    color: '#393F40',
    fontSize: 16,
    fontWeight: '600',
  },
})
