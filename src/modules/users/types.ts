export type User = {
  id: number
  name: string
  email: string
  uf: string
  city: string
  phone: string
  profile_type: string
  tasker: number
  consumer: number
}

export type GetWhoamiResponse = {
  user: User
}
