import { create } from "zustand"

import { fakeApi } from "@shared/api"
import type { AbstractBook } from "@shared/api"

// fetch effect later
const initialBooks = fakeApi.library.books.getAll()

interface BookStoreState {
  books: AbstractBook[]
  isLoading: boolean
  error: string | null
}

interface BookStoreActions {
  fetchBooks: () => void
  addBook: (book: AbstractBook) => void
  removeBook: (bookId: number) => void
  updateBook: (bookId: number, updates: Partial<AbstractBook>) => void
}

export const useBookStore = create<BookStoreState & BookStoreActions>(set => ({
  books: initialBooks,
  isLoading: false,
  error: null,

  fetchBooks: async () => {
    try {
      set({ isLoading: true, error: null })
      const books = fakeApi.library.books.getAll()
      set({ books, isLoading: false })
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false })
    }
  },

  addBook: book =>
    set(state => ({
      books: [...state.books, book],
    })),

  removeBook: bookId =>
    set(state => ({
      books: state.books.filter(book => book.id !== bookId),
    })),

  updateBook: (bookId, updates) =>
    set(state => ({
      books: state.books.map(book => (book.id === bookId ? { ...book, ...updates } : book)),
    })),
}))

export const useBooks = () => useBookStore(state => state.books)
export const useBooksLoading = () => useBookStore(state => state.isLoading)
export const useBooksError = () => useBookStore(state => state.error)

export const useBook = (bookId: number) => {
  return useBookStore(state => state.books.find(({ id }) => id === bookId))
}
