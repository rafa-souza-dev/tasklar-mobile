import { useMutation, useQuery } from '@tanstack/react-query'

import { GetServicesRequest } from './types'
import {
  getServicesByConsumer,
  getServicesByJob,
  getServicesByTasker,
  postResolveService,
  postService,
} from './client'

export function useServicesByJob(jobId: number, params?: GetServicesRequest) {
  return useQuery({
    queryKey: ['services_by_job', jobId, params],
    queryFn: () => getServicesByJob(jobId, params),
    enabled: Boolean(jobId) && Boolean(params?.date),
    staleTime: 0,
  })
}

export function useServicesByTasker(
  taskerId: number,
  params?: GetServicesRequest,
) {
  return useQuery({
    queryKey: ['services_by_tasker', taskerId],
    queryFn: () => getServicesByTasker(taskerId, params),
    enabled: Boolean(taskerId),
    staleTime: 0,
  })
}

export function useServicesByConsumer(
  consumerId: number,
  params?: GetServicesRequest,
) {
  return useQuery({
    queryKey: ['services_by_consumer', consumerId],
    queryFn: () => getServicesByConsumer(consumerId, params),
    enabled: Boolean(consumerId),
    staleTime: 0,
  })
}

export function useCreateService() {
  return useMutation({
    mutationFn: postService,
  })
}

export function useResolveService() {
  return useMutation({
    mutationFn: postResolveService,
  })
}
