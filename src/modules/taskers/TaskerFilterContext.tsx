import { createContext, ReactNode, useContext, useState } from 'react'
import { GetTaskersRequest } from './types'

type TaskerFilterProps = {
  params: GetTaskersRequest
  isFirstPage: boolean
  setSelectedCategory: (category?: string) => void
  setSelectedUf: (uf?: string) => void
  setSelectedCity: (city?: string) => void
  setSelectedLimit: (limit?: string) => void
  setSelectedOffset: (offset?: string) => void
  setSelectedPage: (limit?: string, offset?: string) => void
  setSelectedLocation: (uf?: string, city?: string) => void
}

type TaskerFilterProviderProps = {
  children: ReactNode
}

export const TaskerFilterContext = createContext<TaskerFilterProps>(
  {} as TaskerFilterProps,
)

export function useTaskerFilter() {
  return useContext(TaskerFilterContext)
}

const firstPageParams = {
  limit: undefined,
  offset: undefined,
}

export function TaskerFilterProvider({ children }: TaskerFilterProviderProps) {
  const [params, setParams] = useState<GetTaskersRequest>({})
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

  return (
    <TaskerFilterContext.Provider
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
      }}
    >
      {children}
    </TaskerFilterContext.Provider>
  )
}
