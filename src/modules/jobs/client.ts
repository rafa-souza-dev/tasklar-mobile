import { client } from '../../client'
import { GetJobDetailsResponse, GetJobsRequest, GetJobsResponse } from './types'

const JOBS = '/jobs/'
const JOB_DETAILS = (jobId: number) => `${JOBS}${jobId}/`

export async function getJobs(params?: GetJobsRequest) {
  await new Promise((resolve) => setTimeout(resolve, 1000))

  const response = await client.get<GetJobsResponse>(JOBS, {
    params,
  })

  return response.data
}

export async function getJob(jobId: number) {
  const response = await client.get<GetJobDetailsResponse>(JOB_DETAILS(jobId))

  return response.data
}
