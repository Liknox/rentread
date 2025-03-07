import { fakeApi, Order } from "@shared/api"
import { bookModel } from "entities/book"
import { DEFAULT_DURATION, useCartBooksStore, useDeliveryStore, useDurationsStore } from "./store"

export const useOrderDurations = () => {
   const { durations } = useDurationsStore()
   return durations
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
   const isBookInCart = useCartBooksStore(state => state.cartBooks.includes(bookId))

   return { isBookInCart }
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

export const useDelivery = () => {
   const delivery = useDeliveryStore().delivery
   return delivery
}

export const submitOrder = () => {
   const { cartBooks, reset: booksReset } = useCartBooksStore.getState()
   const { durations, reset: durationsReset } = useDurationsStore.getState()

   const viewer = fakeApi.users.users.getViewer()
   const newOrders: Order[] = cartBooks.map(aBookId => {
      return fakeApi.checkout.orders.createOrder({
         bookId: fakeApi.users.userBooks.shuffleByABook(aBookId).id,
         userId: viewer.id,
         status: "WAITING_TRANSFER",
         startDelta: 0,
         deliveredDelta: 2,
         endDelta: durations[aBookId] || 14,
         costs: fakeApi.library.books.getPrice(fakeApi.library.books.getById(aBookId)!),
      })
   })

   viewer.openedOrders.push(...newOrders.map(no => no.id))

   fakeApi.checkout.orders.__pushTo(...newOrders)
   fakeApi.users.users.__updateUser(viewer)

   console.log("everything worked well")

   booksReset()
   durationsReset()
}
