import dayjs from "dayjs"

import { type Book, type Order, fakeApi } from "@shared/api"
import { orderModel } from "./index"

const getRentStats = (userBooks: Book[]) => {
   return userBooks.map(ub => {
      const maxDuration = dayjs(ub.availableBefore).diff(dayjs(), "day")
      const orders = fakeApi.checkout.orders.getByBookId(ub.id).sort((a, b) => a.id - b.id)
      const lastStatus = orders.slice(-1)[0]?.status

      const couldBeRent = !orders.length || lastStatus === "CLOSED"

      return {
         book: ub,
         maxDuration,
         couldBeRent,
      }
   })
}

export const getRentInfo = (aBookId: number) => {
   const userBooks = fakeApi.users.userBooks.getUserBooksByABook(aBookId)
   // CASE: No copies
   if (!userBooks.length) {
      return {
         // couldBeRent: false,
         // couldBeReserve: false,
         inStock: false,
         status: "OUT_STOCK" as const,
         duration: 0,
         items: [],
      }
   }

   // Books's statuses
   // Intervals for rental
   const rentStats = getRentStats(userBooks)

   // Only available books:
   // - Not renting for now
   // - Return to owner before 7 days
   const availableBooks = rentStats.filter(rs => rs.couldBeRent && rs.maxDuration >= 7)
   // FIXME: refine later
   const maxDuration = Math.max(...rentStats.map(rs => rs.maxDuration), 0)
   const reservations = fakeApi.checkout.reservations.getByABook(aBookId).filter(r => r.status === "PENDING")

   // CASE: Enough copies for active booking?
   if (reservations.length < availableBooks.length) {
      return {
         // couldBeRent: true,
         // couldBeReserve: false,
         inStock: true,
         status: "RENTABLE" as const,
         duration: maxDuration,
         items: rentStats,
      }
   }

   // CASE: Too much booking requests, you can only get in line for a book
   return {
      // couldBeRent: false,
      // couldBeReserve: true,
      inStock: true,
      status: "RESERVABLE" as const,
      duration: maxDuration,
      items: rentStats,
   }
}

export const submitOrder = () => {
   const { cartBooks, reset: booksReset } = orderModel.useCartBooksStore.getState()
   const { durations, reset: durationsReset } = orderModel.useDurationsStore.getState()

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

   booksReset()
   durationsReset()
}
