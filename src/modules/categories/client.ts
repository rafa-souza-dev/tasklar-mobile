import { client } from '../../client'
import { GetCategoriesResponse } from './types'

const CATEGORIES = '/categories'

export async function getCategories() {
  const response = await client.get<GetCategoriesResponse>(CATEGORIES)

  return response.data.results
}
