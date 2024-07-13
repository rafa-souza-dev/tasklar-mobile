/* eslint-disable jsx-a11y/alt-text */
import {
  NavigationProp,
  RouteProp,
  useNavigation,
} from '@react-navigation/native'
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native'

import { RootStackParamList } from '../@types/navigation'
import { useFormattedJob } from '../modules/jobs/stores'

type DetailsScreenRouteProp = RouteProp<RootStackParamList, 'JobDetails'>

type JobDetailsProps = {
  route: DetailsScreenRouteProp
}

export function JobDetails(props: JobDetailsProps) {
  const id = props.route.params.id
  const { data: job, formattedHourlyRate } = useFormattedJob(id)
  const navigation = useNavigation<NavigationProp<RootStackParamList>>()

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
            <Text style={styles.name}>{job?.tasker.user.name}</Text>
            <Text style={styles.category}>{job?.category.name}</Text>
          </View>
          <ScrollView style={styles.descriptionContainer}>
            <Text style={styles.description}>{job?.description}</Text>
          </ScrollView>
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
            <Text style={styles.valueBRL}>{formattedHourlyRate}</Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation.navigate('JobContract', { id })
          }}
        >
          <Text style={styles.label}>Contratar</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'space-between',
    paddingBottom: 24,
  },
  descriptionContainer: {
    maxHeight: 200,
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
