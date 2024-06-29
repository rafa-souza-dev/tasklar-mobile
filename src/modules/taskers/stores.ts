import { useQuery } from '@tanstack/react-query'
import { getTasker, getTaskers } from './client'

export function useTaskers() {
  return useQuery({
    queryKey: ['taskers'],
    queryFn: getTaskers,
  })
}

export function useTasker(taskerId: string) {
  return useQuery({
    queryKey: ['tasker', taskerId],
    queryFn: () => getTasker(taskerId),
    enabled: Boolean(taskerId),
  })
}
