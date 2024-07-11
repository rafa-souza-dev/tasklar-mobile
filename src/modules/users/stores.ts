import { useQuery } from '@tanstack/react-query'
import { getWhoami } from './client'

export function useWhoami() {
  return useQuery({
    queryKey: ['whoami'],
    queryFn: getWhoami,
  })
}
