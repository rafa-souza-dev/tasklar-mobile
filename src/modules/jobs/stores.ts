/* eslint-disable react-hooks/exhaustive-deps */
import { useMutation, useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'

import { getJob, getJobs, postJob } from './client'
import { GetJobsRequest, JobAbridged } from './types'
import { useJobFilter } from './JobFilterContext'

export function useJobs(params?: GetJobsRequest) {
  return useQuery({
    queryKey: ['jobs'],
    queryFn: () => getJobs(params),
  })
}

export function useJob(jobId: number) {
  return useQuery({
    queryKey: ['job', jobId],
    queryFn: () => getJob(jobId),
    enabled: Boolean(jobId),
  })
}

export function useCreateJob() {
  return useMutation({
    mutationFn: postJob,
  })
}

export function useFormattedJob(jobId: number) {
  const queryJob = useJob(jobId)
  const formattedHourlyRate = Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(Number(queryJob.data?.value))

  return { ...queryJob, formattedHourlyRate }
}

export function useFormattedJobs() {
  const { params } = useJobFilter()
  const [data, setData] = useState<JobAbridged[]>()
  const queryJobs = useJobs(params)
  const hasJobs = Boolean(queryJobs.data?.results?.length)
  const next = queryJobs.data?.next
  const previous = queryJobs.data?.previous
  let offset: string | undefined
  let limit: string | undefined

  if (next) {
    const nextURL = new URL(String(next))
    const nextURLParams = nextURL.searchParams
    offset = nextURLParams?.get('offset') ?? undefined
    limit = nextURLParams?.get('limit') ?? undefined
  }

  useEffect(() => {
    queryJobs.refetch()
  }, [params])

  useEffect(() => {
    setData((prev) => {
      if (prev && queryJobs.data?.previous) {
        return [...prev, ...queryJobs.data?.results]
      }

      return queryJobs.data?.results
    })
  }, [queryJobs.data?.results, queryJobs.data?.previous])

  return { ...queryJobs, hasJobs, data, next, previous, limit, offset }
}
