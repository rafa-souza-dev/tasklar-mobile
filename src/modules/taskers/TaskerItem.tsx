/* eslint-disable jsx-a11y/alt-text */
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { RootStackParamList } from '../../@types/navigation'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useNavigation } from '@react-navigation/native'

type TaskerItemNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Home'
>

type TaskerItemProps = {
  id: string
  name: string
  description: string
  rateValue: number
  rateQuantity: number
  valueBRL: number
}

export function TaskerItem(props: TaskerItemProps) {
  const description = props.description.slice(0, 35) + '...'
  const navigation = useNavigation<TaskerItemNavigationProp>()

  function handleNavigateToTaskerDetails() {
    navigation.navigate('TaskerDetails', { id: props.id })
  }

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={handleNavigateToTaskerDetails}
    >
      <View style={styles.main}>
        <View style={styles.taskerDetails}>
          <Image
            style={styles.image}
            source={require('../../../assets/favicon.png')}
          />
          <View style={styles.nameAndDescription}>
            <Text style={styles.name}>{props.name}</Text>
            <Text style={styles.description}>{description}</Text>
          </View>
        </View>
        <Image source={require('../../../assets/verify-icon.png')} />
      </View>

      <View style={styles.footer}>
        <View style={styles.rate}>
          <Image source={require('../../../assets/star-blue.png')} />
          <View style={styles.rateDetails}>
            <Text style={styles.rateValue}>{props.rateValue}</Text>
            <Text style={styles.rateQuantity}>({props.rateQuantity})</Text>
          </View>
        </View>

        <View style={styles.value}>
          <Text style={styles.valueTitle}>Valor por hora:</Text>
          <Text style={styles.valueBRL}>R$ {props.valueBRL}</Text>
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
