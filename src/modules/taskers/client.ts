import { client } from '../../client'
import { GetTaskerDetailsResponse, GetTaskersResponse } from './types'

const TASKERS = '/taskers'
const TASKER_DETAILS = (taskerId: number) => `${TASKERS}/${taskerId}`

export async function getTaskers() {
  const response = await client.get<GetTaskersResponse>(TASKERS)

  return response.data.results
}

export async function getTasker(taskerId: number) {
  const response = await client.get<GetTaskerDetailsResponse>(
    TASKER_DETAILS(taskerId),
  )

  return response.data
}
