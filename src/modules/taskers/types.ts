export type Category = {
  id: number
  name: string
}

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

export type GetTaskersResponse = {
  count: number
  next: string
  previous: string
  results: TaskerAbridged[]
}

export type GetTaskerDetailsResponse = Tasker
