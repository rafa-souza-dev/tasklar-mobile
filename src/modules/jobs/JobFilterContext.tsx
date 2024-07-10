import { createContext, ReactNode, useContext, useState } from 'react'
import { GetJobsRequest } from './types'

type JobFilterProps = {
  params: GetJobsRequest
  isFirstPage: boolean
  clear: () => void
  setSelectedCategory: (category?: string) => void
  setSelectedUf: (uf?: string) => void
  setSelectedCity: (city?: string) => void
  setSelectedLimit: (limit?: string) => void
  setSelectedOffset: (offset?: string) => void
  setSelectedPage: (limit?: string, offset?: string) => void
  setSelectedLocation: (uf?: string, city?: string) => void
}

type JobFilterProviderProps = {
  children: ReactNode
}

export const JobFilterContext = createContext<JobFilterProps>(
  {} as JobFilterProps,
)

export function useJobFilter() {
  return useContext(JobFilterContext)
}

const firstPageParams = {
  limit: undefined,
  offset: undefined,
}

export function JobFilterProvider({ children }: JobFilterProviderProps) {
  const [params, setParams] = useState<GetJobsRequest>({})
  const isFirstPage = !params.limit && !params.offset

  function setSelectedCategory(category?: string) {
    setParams((prevState) => ({ ...prevState, category, ...firstPageParams }))
  }

  function setSelectedUf(uf?: string) {
    setParams((prevState) => ({ ...prevState, uf, ...firstPageParams }))
  }

  function setSelectedCity(city?: string) {
    setParams((prevState) => ({ ...prevState, city, ...firstPageParams }))
  }

  function setSelectedLimit(limit?: string) {
    setParams((prevState) => ({ ...prevState, limit }))
  }

  function setSelectedOffset(offset?: string) {
    setParams((prevState) => ({ ...prevState, offset }))
  }

  function setSelectedPage(limit?: string, offset?: string) {
    setParams((prevState) => ({ ...prevState, limit, offset }))
  }

  function setSelectedLocation(uf?: string, city?: string) {
    setParams((prevState) => ({ ...prevState, uf, city, ...firstPageParams }))
  }

  function clear() {
    setParams({
      category: undefined,
      uf: undefined,
      city: undefined,
      limit: undefined,
      offset: undefined,
    })
  }

  return (
    <JobFilterContext.Provider
      value={{
        params,
        isFirstPage,
        setSelectedCategory,
        setSelectedUf,
        setSelectedCity,
        setSelectedLimit,
        setSelectedOffset,
        setSelectedPage,
        setSelectedLocation,
        clear,
      }}
    >
      {children}
    </JobFilterContext.Provider>
  )
}
