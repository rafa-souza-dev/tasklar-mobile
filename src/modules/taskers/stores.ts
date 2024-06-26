import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'

import { getTasker, getTaskers } from './client'
import { GetTaskersRequest, TaskerAbridged } from './types'

export function useTaskers(params?: GetTaskersRequest) {
  return useQuery({
    queryKey: ['taskers'],
    queryFn: () => getTaskers(params),
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

export function useFormattedTaskers(params?: GetTaskersRequest) {
  const [data, setData] = useState<TaskerAbridged[]>()
  const queryTaskers = useTaskers(params)
  const hasTaskers = Boolean(queryTaskers.data?.results?.length)
  const next = queryTaskers.data?.next
  const previous = queryTaskers.data?.previous
  let offset
  let limit

  if (next) {
    const nextURL = new URL(String(next))
    const nextURLParams = nextURL.searchParams
    offset = nextURLParams?.get('offset')
    limit = nextURLParams?.get('limit')
  }

  useEffect(() => {
    setData((prev) => {
      if (prev && queryTaskers.data?.previous) {
        return [...prev, ...queryTaskers.data?.results]
      }

      return queryTaskers.data?.results
    })
  }, [queryTaskers.data?.results, queryTaskers.data?.previous])

  return { ...queryTaskers, hasTaskers, data, next, previous, limit, offset }
}
