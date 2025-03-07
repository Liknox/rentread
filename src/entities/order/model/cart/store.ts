import { create } from "zustand"
import { initLSItem } from "@shared/lib/browser"

// TODO: change
export const DEFAULT_DURATION = 7

export interface CartBooksState {
   cartBooks: number[]
   toggleBook: (bookId: number) => void
   reset: () => void
}

// FIXME: init later by API
export const booksInitialState: number[] = []

export const useCartBooksStore = create<CartBooksState>(set => {
   const lsItem = initLSItem<number[]>("temp-cart-books", booksInitialState)

   return {
      cartBooks: lsItem.value,
      toggleBook: (bookId: number) =>
         set(state => {
            let newBook

            if (state.cartBooks.includes(bookId)) {
               newBook = { cartBooks: state.cartBooks.filter(id => id !== bookId) }
            } else {
               newBook = { cartBooks: [...state.cartBooks, bookId] }
            }

            lsItem.setValue(newBook.cartBooks)

            return { ...newBook }
         }),
      reset: () => {
         lsItem.setValue([])
         set({ cartBooks: [] })
      },
   }
})

interface DurationsState {
   durations: Record<number, number>
   setBookDuration: (bookId: number, duration?: number) => void
   toggleBook: (bookId: number) => void
   submitOrder: () => void
   reset: () => void
}

const durationsInitialState: Record<number, number> = {}

export const useDurationsStore = create<DurationsState>(set => {
   const lsItem = initLSItem<Record<number, number>>("temp-cart-duration", durationsInitialState)

   return {
      durations: lsItem.value,
      setBookDuration: (bookId, duration) =>
         set(state => {
            let newDurations

            if (duration === undefined) {
               newDurations = { ...state.durations }
               delete newDurations[bookId]
            } else {
               newDurations = { ...state.durations, [bookId]: duration }
            }

            lsItem.setValue(newDurations) // Зберегти новий стан у localStorage
            return { durations: newDurations }
         }),
      toggleBook: bookId =>
         set(state => {
            const duration = state.durations[bookId] ? undefined : DEFAULT_DURATION
            let newDurations

            if (duration === undefined) {
               newDurations = { ...state.durations }
            } else {
               newDurations = { ...state.durations, [bookId]: duration }
            }

            lsItem.setValue(newDurations)
            return { durations: newDurations }
         }),
      submitOrder: () =>
         set(() => {
            console.log("$durations SUBMIT")
            lsItem.setValue({}) // Очистити durations після відправлення замовлення
            return { durations: {} }
         }),
      reset: () => {
         lsItem.setValue([])
         set({ durations: [] })
      },
   }
})
})
