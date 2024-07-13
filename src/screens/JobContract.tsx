import { RouteProp } from '@react-navigation/native'
import { StyleSheet, Text, View } from 'react-native'

import { RootStackParamList } from '../@types/navigation'
import { DayOfMonth } from '../components/DayOfMonth'

type ContractScreenRouteProp = RouteProp<RootStackParamList, 'JobContract'>

type JobContractProps = {
  route: ContractScreenRouteProp
}

export function JobContract(props: JobContractProps) {
  return (
    <>
      <View>
        <Text>{props.route.params.id}</Text>
      </View>
      <View style={styles.weekContainer}>
        {Array.from({ length: 7 }).map((_, index) => (
          <DayOfMonth key={String(index)} date={new Date()} />
        ))}
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  weekContainer: {
    flexDirection: 'row',
    gap: 8,
    padding: 6,
    flexWrap: 'wrap',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
