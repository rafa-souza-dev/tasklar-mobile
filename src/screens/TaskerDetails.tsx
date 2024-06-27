import { RouteProp } from '@react-navigation/native'
import { Text, View } from 'react-native'

import { RootStackParamList } from '../@types/navigation'

type DetailsScreenRouteProp = RouteProp<RootStackParamList, 'TaskerDetails'>

type TaskerDetailsProps = {
  route: DetailsScreenRouteProp
}

export function TaskerDetails(props: TaskerDetailsProps) {
  return (
    <View>
      <Text>Detalhes de {props.route.params.id}</Text>
    </View>
  )
}
