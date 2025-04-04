import { DEFAULT_ORDER_DURATION, PERSIST_STORE_ITEMS } from "@app/configs/constants"
import { initLSItem } from "@shared/lib/browser"
import { create } from "zustand"

interface CartBooksState {
   cartBooks: number[]
   toggleBook: (bookId: number) => void
   reset: () => void
}

// FIXME: init later by API
const booksInitialState: number[] = []

export const useCartBooksStore = create<CartBooksState>(set => {
   const lsItem = initLSItem<number[]>(PERSIST_STORE_ITEMS.cartBooks, booksInitialState)

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
   const lsItem = initLSItem<Record<number, number>>(PERSIST_STORE_ITEMS.cartDuration, durationsInitialState)

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

            lsItem.setValue(newDurations)
            return { durations: newDurations }
         }),
      toggleBook: bookId =>
         set(state => {
            const duration = state.durations[bookId] ? undefined : DEFAULT_ORDER_DURATION
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
            lsItem.setValue({})
            return { durations: {} }
         }),
      reset: () => {
         lsItem.setValue([])
         set({ durations: [] })
      },
   }
})

interface DeliveryState {
   delivery: {
      date: string
      address: string
   }
   setDelivery: (payload: Partial<{ date: string; address: string }>) => void
}

const initialDelivery = { date: "", address: "" }

export const useDeliveryStore = create<DeliveryState>(set => {
   const lsItem = initLSItem<{ date: string; address: string }>(PERSIST_STORE_ITEMS.cartDelivery, initialDelivery)
   lsItem.setValue(initialDelivery)

   return {
      delivery: lsItem.value,
      setDelivery: payload =>
         set(state => {
            const newDelivery = {
               date: payload.date ?? state.delivery.date,
               address: payload.address ?? state.delivery.address,
            }

            lsItem.setValue(newDelivery)
            return { delivery: newDelivery }
         }),
   }
})
