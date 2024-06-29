/* eslint-disable jsx-a11y/alt-text */
import { RouteProp } from '@react-navigation/native'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'

import { RootStackParamList } from '../@types/navigation'
import { useTasker } from '../modules/taskers/stores'

type DetailsScreenRouteProp = RouteProp<RootStackParamList, 'TaskerDetails'>

type TaskerDetailsProps = {
  route: DetailsScreenRouteProp
}

export function TaskerDetails(props: TaskerDetailsProps) {
  const id = props.route.params.id
  const { data: tasker } = useTasker(id)

  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={require('../../assets/profile-photo.png')}
          />
        </View>
        <View style={styles.nameAndDescription}>
          <View>
            <Text style={styles.name}>{tasker?.user.name}</Text>
            <Text style={styles.category}>{tasker?.category.name}</Text>
          </View>
          <Text style={styles.description}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae
            iste repellendus minus numquam, tempore, repellat culpa expedita
            aspernatur aliquid inventore ab autem modi sint reiciendis ipsam.
            Iusto ullam libero ipsum.
          </Text>
        </View>
      </View>

      <View style={{ gap: 16 }}>
        <View style={styles.footer}>
          <View style={styles.rate}>
            <Image
              source={require('../../assets/star-blue.png')}
              style={{
                width: 24,
                height: 24,
              }}
            />
            <View style={styles.rateDetails}>
              <Text style={styles.rateValue}>5.0</Text>
              <Text style={styles.rateQuantity}>(1000)</Text>
            </View>
          </View>

          <View style={styles.value}>
            <Text style={styles.valueTitle}>Valor por hora:</Text>
            <Text style={styles.valueBRL}>R$ 120,00</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.label}>Contratar</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'space-between',
  },
  imageContainer: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    marginHorizontal: 'auto',
    borderRadius: 100,
    width: 190,
    height: 190,
    shadowColor: 'black',
  },
  main: {
    gap: 16,
  },
  nameAndDescription: {
    flexDirection: 'column',
    gap: 12,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#233DFF',
  },
  category: {
    fontSize: 16,
  },
  description: {
    fontSize: 20,
    color: '#233DFF',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
    fontSize: 20,
  },
  rateQuantity: {
    color: '#757B7C',
    fontSize: 20,
  },
  value: {
    flexDirection: 'row',
    gap: 4,
  },
  valueTitle: {
    color: '#757B7C',
    fontSize: 20,
  },
  valueBRL: {
    color: '#393F40',
    fontSize: 20,
    fontWeight: '600',
  },
  button: {
    width: '100%',
    height: 60,
    backgroundColor: '#12229D',
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontSize: 20,
    color: 'white',
  },
})
