import { useQuery } from '@tanstack/react-query'
import { getTaskers } from './client'

export function useTaskers() {
  return useQuery({
    queryKey: ['taskers'],
    queryFn: getTaskers,
  })
}
