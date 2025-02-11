import { type Book, fakeApi } from "@shared/api"
import dayjs from "dayjs"

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
