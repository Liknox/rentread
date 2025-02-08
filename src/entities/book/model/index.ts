import { createStore } from "effector"
import { useStoreMap, useUnit } from "effector-react"
import { fakeApi } from "shared/api"

// FIXME: fetch effect later
export const initialState = fakeApi.library.books.getAll()

export const $store = createStore<typeof initialState>(initialState)

export const useBooks = () => useUnit($store)

export const useBook = (bookId: number) =>
   useStoreMap({
      store: $store,
      keys: [bookId],
      fn: (books, [bookId]) => books.find(({ id }) => id === bookId),
   })
