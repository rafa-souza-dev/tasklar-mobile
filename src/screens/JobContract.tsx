import { RouteProp } from '@react-navigation/native'
import { Text } from 'react-native'
import { RootStackParamList } from '../@types/navigation'

type ContractScreenRouteProp = RouteProp<RootStackParamList, 'JobContract'>

type JobContractProps = {
  route: ContractScreenRouteProp
}

export function JobContract(props: JobContractProps) {
  return <Text>{props.route.params.id}</Text>
}
