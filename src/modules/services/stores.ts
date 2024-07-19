import { useQuery } from '@tanstack/react-query'

import { GetServicesRequest } from './types'
import { getServicesByJob } from './client'

export function useServicesByJob(jobId: number, params?: GetServicesRequest) {
  return useQuery({
    queryKey: ['services_by_job', jobId, params],
    queryFn: () => getServicesByJob(jobId, params),
    enabled: Boolean(jobId),
  })
}
