import { Category } from '../categories/types'

export type Period = {
  id: number
  title: string
}

type User = {
  name: string
}

export type TaskerAbridged = {
  id: number
  user: User
  periods: Period[]
  phone: string
  hourly_rate: number
  description: string
}

export type Tasker = TaskerAbridged & {
  category: Category
}

export type GetTaskersRequest = {
  category?: string
  uf?: string
  city?: string
  limit?: string
  offset?: string
}

export type GetTaskersResponse = {
  count: number
  next: string
  previous: string
  results: TaskerAbridged[]
}

export type GetTaskerDetailsResponse = Tasker

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
