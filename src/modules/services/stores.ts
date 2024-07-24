import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { GetServicesRequest } from './types'
import {
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

export function useServicesByTasker(taskerId: number) {
  return useQuery({
    queryKey: ['services_by_tasker', taskerId],
    queryFn: () => getServicesByTasker(taskerId),
    enabled: Boolean(taskerId),
    staleTime: 0,
  })
}

export function useCreateService() {
  return useMutation({
    mutationFn: postService,
  })
}

export function useResolveService() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: postResolveService,
    // onSuccess() {
    //   queryClient.invalidateQueries(['services_by_tasker'])
    // },
  })
}
