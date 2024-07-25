import { User } from '../users/types'

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

export type ServiceFull = {
  id: number
  request_description: string
  date: string
  time: string
  status: string
  value: number
  uf: string
  city: string
  neighborhood: string
  consumer: {
    id: number
    user: User
  }
  job: {
    id: number
    category: {
      name: string
    }
  }
  tasker: number
}

export type ServiceFullTasker = {
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
  job: {
    id: number
    category: {
      name: string
    }
  }
  tasker: {
    id: number
    user: User
  }
}

export type GetServicesRequest = Partial<{
  date: string
  status: string
}>

export type GetServicesResponse = Service[]

export type GetServicesFullResponse = ServiceFull[]

export type GetServicesFullTaskerResponse = ServiceFullTasker[]

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

export type postResolveServiceParams = {
  service_id: number
  status?: string
  consumer_id: number
  job_id: number
  tasker_id: number
}
