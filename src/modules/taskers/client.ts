import { client } from '../../client'
import { GetTaskersResponse } from './types'

const TASKERS = '/taskers'

export async function getTaskers() {
  const response = await client.get<GetTaskersResponse>(TASKERS)

  return response.data.results
}
