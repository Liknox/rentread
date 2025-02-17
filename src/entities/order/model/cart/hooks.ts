import { useStoreMap, useUnit } from "effector-react"
import { bookModel } from "entities/book"
import { $books, $durations, DEFAULT_DURATION } from "./store"
import { fakeApi } from "@shared/api"

export const useOrderDurations = () => useUnit($durations)

export const useBookStatus = (bookId: number) => {
   const isBookInCart = useStoreMap({
      store: $books,
      keys: [bookId],
      fn: (state, [bookId]) => state.includes(bookId),
   })

   return { isBookInCart }
}

export const useOrderBooks = () => {
   const books = bookModel.useBooks()
   const orderIds = useUnit($books)
   return books.filter(b => orderIds.includes(b.id))
}

export const useOrderValidation = () => {
   const bookIds = useUnit($books)
   const isEmptyCart = bookIds.length === 0

   return { isEmptyCart }
}

// FIXME: useStoreMap instead
export const useOrder = () => {
   const books = useOrderBooks()
   const durations = useOrderDurations()

   const price = books
      .map(b => {
         const price = fakeApi.library.books.getPrice(b)
         // FIXME: @hardcoded (return undefined, need to fix)
         const duration = durations[b.id] || DEFAULT_DURATION
         const coeff = duration / DEFAULT_DURATION
         return Math.floor(price * coeff)
      })
      .reduce((a, b) => a + b, 0)

   return { books, price }
}
