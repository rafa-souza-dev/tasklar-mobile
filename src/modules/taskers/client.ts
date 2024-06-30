import { client } from '../../client'
import {
  GetTaskerDetailsResponse,
  GetTaskersRequest,
  GetTaskersResponse,
} from './types'

const TASKERS = '/taskers'
const TASKER_DETAILS = (taskerId: number) => `${TASKERS}/${taskerId}`

export async function getTaskers(params?: GetTaskersRequest) {
  const response = await client.get<GetTaskersResponse>(TASKERS, {
    params,
  })

  return response.data.results
}

export async function getTasker(taskerId: number) {
  const response = await client.get<GetTaskerDetailsResponse>(
    TASKER_DETAILS(taskerId),
  )

  return response.data
}
