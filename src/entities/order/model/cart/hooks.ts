import { useStoreMap, useUnit } from "effector-react"
import { bookModel } from "entities/book"
import { $books, $delivery, $durations, DEFAULT_DURATION } from "./store"
import { fakeApi } from "@shared/api"

export const useOrderDurations = () => useUnit($durations)

const RECOMMEND_MAX = 6

export const useRecommended = () => {
   const order = useOrderBooks()
   const orderIds = order.map(b => b.id)
   const totalBooks = bookModel.useBooks()

   const orderAuthors = order.flatMap(b => b.authors).map(a => a.id)

   const otherBooks = totalBooks.filter(b => !orderIds.includes(b.id))

   const booksByAuthor = otherBooks.filter(b => b.authors.some(a => orderAuthors.includes(a.id)))
   const lenA = booksByAuthor.length
   const booksByAuthorLimited = booksByAuthor.filter(() => Math.random() < RECOMMEND_MAX / lenA)
   const booksByAuthorLimitedIds = booksByAuthorLimited.map(b => b.id)
   const booksPopular = otherBooks
      .filter(fakeApi.library.books.isPopular)
      .filter(b => !booksByAuthorLimitedIds.includes(b.id))
   const books = [...booksByAuthorLimited, ...booksPopular]

   return { books }
}

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

export const useDeliveryStore = () => {
   return useUnit($delivery)
}
