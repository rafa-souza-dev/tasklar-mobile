import { client } from '../../client'
import { GetTaskerDetailsResponse, GetTaskersResponse } from './types'

const TASKERS = '/taskers'
const TASKER_DETAILS = (taskerId: string) => `${TASKERS}/${taskerId}`

export async function getTaskers() {
  const response = await client.get<GetTaskersResponse>(TASKERS)

  return response.data.results
}

export async function getTasker(taskerId: string) {
  const response = await client.get<GetTaskerDetailsResponse>(
    TASKER_DETAILS(taskerId),
  )

  return response.data
}
