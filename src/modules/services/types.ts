export type Service = {
  id: number
  request_description: string
  date: string
  time: string
  status: string
  value: number
  uf: string
  city: string
  neighborhood: string
  consumer: number
  job: number
  tasker: number
}

export type GetServicesRequest = Partial<{
  date: string
  status: string
}>

export type GetServicesResponse = Service[]

export type PostServiceRequest = Partial<{
  consumer_id: number
  tasker_id: number
  job_id: number
  request_description: string
  date: string
  time: string
  status: string
  value: number
  uf: string
  city: string
  neighborhood: string
}>
