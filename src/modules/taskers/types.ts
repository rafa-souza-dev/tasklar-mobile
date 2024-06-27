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

export type Tasker = {
  id: number
  user: User
  category: Category
  periods: Period[]
  phone: string
  hourly_rate: number
  description: string
}

export type GetTaskersResponse = {
  count: number
  next: string
  previous: string
  results: Tasker[]
}
