import { createContext, ReactNode, useContext, useState } from 'react'

type TaskerFilterProps = {
  selectedCategory?: string
  setSelectedCategory: (category?: string) => void
}

type TaskerFilterProviderProps = {
  children: ReactNode
}

const TaskerFilterContext = createContext<TaskerFilterProps>(
  {} as TaskerFilterProps,
)

export function useTaskerFilter() {
  return useContext(TaskerFilterContext)
}

export function TaskerFilterProvider({ children }: TaskerFilterProviderProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(
    undefined,
  )

  return (
    <TaskerFilterContext.Provider
      value={{
        selectedCategory,
        setSelectedCategory,
      }}
    >
      {children}
    </TaskerFilterContext.Provider>
  )
}
