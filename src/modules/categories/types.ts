export type Category = {
  id: number
  name: string
}

export type GetCategoriesResponse = {
  count: number
  next: string
  previous: string
  results: Category[]
}
