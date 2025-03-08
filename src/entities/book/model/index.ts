import { fakeApi } from "shared/api"
import { create } from "zustand"

// FIXME: fetch effect later
const initialState = fakeApi.library.books.getAll()

interface BookStoreState {
   books: typeof initialState
}

export const useBookStore = create<BookStoreState>(() => ({
   books: initialState,
}))

export const useBooks = () => useBookStore(state => state.books)

export const useBook = (bookId: number) => {
   return useBookStore(state => state.books.find(({ id }) => id === bookId))
}
