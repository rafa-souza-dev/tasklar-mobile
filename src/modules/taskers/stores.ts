import { useQuery } from '@tanstack/react-query'
import { getTasker, getTaskers } from './client'

export function useTaskers() {
  return useQuery({
    queryKey: ['taskers'],
    queryFn: getTaskers,
  })
}

export function useTasker(taskerId: number) {
  return useQuery({
    queryKey: ['tasker', taskerId],
    queryFn: () => getTasker(taskerId),
    enabled: Boolean(taskerId),
  })
}

export function useFormattedTasker(taskerId: number) {
  const queryTasker = useTasker(taskerId)
  const formattedHourlyRate = Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(Number(queryTasker.data?.hourly_rate))

  return { ...queryTasker, formattedHourlyRate }
}
