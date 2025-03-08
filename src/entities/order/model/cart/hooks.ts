import { DEFAULT_ORDER_DURATION, SERVICE_FEE } from "@app/configs/constants"
import { fakeApi } from "@shared/api"
import { bookModel } from "entities/book"
import { useCartBooksStore, useDeliveryStore, useDurationsStore } from "./store"

export const useOrderDurations = () => {
   return useDurationsStore().durations
}

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
   return useCartBooksStore(state => state.cartBooks.includes(bookId))
}

export const useOrderBooks = () => {
   const books = bookModel.useBooks()
   const orderIds = useCartBooksStore().cartBooks
   return books.filter(b => orderIds.includes(b.id))
}

export const useOrderValidation = () => {
   const bookIds = useCartBooksStore().cartBooks
   const isEmptyCart = bookIds.length === 0

   return { isEmptyCart }
}

export const useOrder = () => {
   const books = useOrderBooks()
   const durations = useOrderDurations()
   const priceBeforeFee = books
      .map(b => {
         const price = fakeApi.library.books.getPrice(b)
         // FIXME: @hardcoded (return undefined, need to fix)
         const duration = durations[b.id] || DEFAULT_ORDER_DURATION
         const coeff = duration / DEFAULT_ORDER_DURATION
         return Math.floor(price * coeff)
      })
      .reduce((a, b) => a + b, 0)

   const fee = priceBeforeFee * SERVICE_FEE
   const price = (priceBeforeFee + fee).toFixed(2)

   return { books, price, fee }
}

export const useDelivery = () => {
   return useDeliveryStore().delivery
}
