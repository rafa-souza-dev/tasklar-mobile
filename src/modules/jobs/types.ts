import { Category } from '../categories/types'

export type Period = {
  id: number
  title: string
}

type User = {
  name: string
}

export type JobAbridged = {
  id: number
  days_of_week_display: boolean[]
  tasker: {
    id: number
    user: User
  }
  contact: string
  value: string
  description: string
  duration: string
  start_time: string
  end_time: string
  category: number
}

export type Job = JobAbridged & {
  category: Category
}

export type GetJobsRequest = {
  category?: string
  uf?: string
  city?: string
  limit?: string
  offset?: string
}

export type GetJobsResponse = {
  count: number
  next: string
  previous: string
  results: JobAbridged[]
}

export type PostJobRequest = {
  days_of_week: boolean[]
  contact: string
  value: number
  description: string
  duration: string
  start_time: string
  end_time: string
  tasker: number
  category: number
}

export type GetJobDetailsResponse = Job

export type StateAbbreviation =
  | 'AC'
  | 'AL'
  | 'AP'
  | 'AM'
  | 'BA'
  | 'CE'
  | 'DF'
  | 'ES'
  | 'GO'
  | 'MA'
  | 'MT'
  | 'MS'
  | 'MG'
  | 'PA'
  | 'PB'
  | 'PR'
  | 'PE'
  | 'PI'
  | 'RJ'
  | 'RN'
  | 'RS'
  | 'RO'
  | 'RR'
  | 'SC'
  | 'SP'
  | 'SE'
  | 'TO'
