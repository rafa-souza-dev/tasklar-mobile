import { client } from '../../client'
import { GetServicesRequest, GetServicesResponse } from './types'

const JOBS = '/jobs/'
const SERVICES_BY_JOB = (jobId: number) => `${JOBS}${jobId}/services/`

export async function getServicesByJob(
  jobId: number,
  params?: GetServicesRequest,
) {
  await new Promise((resolve) => setTimeout(resolve, 1000))

  const response = await client.get<GetServicesResponse>(
    SERVICES_BY_JOB(jobId),
    {
      params,
    },
  )

  return response.data
}
