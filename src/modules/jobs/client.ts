import { client } from '../../client'
import {
  GetJobDetailsResponse,
  GetJobsRequest,
  GetJobsResponse,
  PostJobRequest,
} from './types'

const JOBS = '/jobs/'
const JOB_DETAILS = (jobId: number) => `${JOBS}${jobId}/`
const CREATE_JOB = `${JOBS}create/`

export async function getJobs(params?: GetJobsRequest) {
  const response = await client.get<GetJobsResponse>(JOBS, {
    params,
  })

  return response.data
}

export async function getJob(jobId: number) {
  const response = await client.get<GetJobDetailsResponse>(JOB_DETAILS(jobId))

  return response.data
}

export async function postJob(params: PostJobRequest) {
  const response = await client.post(CREATE_JOB, params)

  return response.data
}
