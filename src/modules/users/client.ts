import { client } from '../../client'
import { GetWhoamiResponse } from './types'

const WHOAMI = '/whoami/'

export async function getWhoami() {
  const response = await client.get<GetWhoamiResponse>(WHOAMI)

  return response.data.user
}
