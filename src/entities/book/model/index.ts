import { createStore } from "effector"
import { useUnit } from "effector-react"

export const initialState = []

export const $store = createStore<typeof initialState>(initialState)

export const useBooks = () => useUnit($store)
export const useBook = (bookId: number) => {
   const books = useUnit($store)
   return books.find(({ id }) => id === bookId)
}
