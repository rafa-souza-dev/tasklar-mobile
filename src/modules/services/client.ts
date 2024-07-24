import { client } from '../../client'
import {
  GetServicesFullResponse,
  GetServicesRequest,
  GetServicesResponse,
  postResolveServiceParams,
  PostServiceRequest,
} from './types'

const TASKERS = '/taskers/'
const JOBS = '/jobs/'
const SERVICES_BY_JOB = (jobId: number) => `${JOBS}${jobId}/services/`
const SERVICES_BY_TASKER = (taskerId: number) =>
  `${TASKERS}${taskerId}/services/`
const SERVICES = '/services/'
const SERVICE_CREATE = `${SERVICES}create/`
const SERVICES_ACTION = `/tasker/services/action/`

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

export async function getServicesByTasker(taskerId: number) {
  await new Promise((resolve) => setTimeout(resolve, 1000))

  const response = await client.get<GetServicesFullResponse>(
    SERVICES_BY_TASKER(taskerId),
    {
      params: {
        status: 'pending',
      },
    },
  )

  return response.data
}

export async function postResolveService(params: postResolveServiceParams) {
  const response = await client.post(SERVICES_ACTION, params)

  return response.data
}

export async function postService(params: PostServiceRequest) {
  await new Promise((resolve) => setTimeout(resolve, 1000))

  const response = await client.post(SERVICE_CREATE, params)

  return response.data
}
