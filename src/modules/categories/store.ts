import { useQuery } from '@tanstack/react-query'

import { getCategories } from './client'

export function useCategories() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  })
}
