import type { AbstractBook, Book, Order, Reservation, User } from "@shared/api"
import { fakeApi } from "@shared/api"
import dayjs from "dayjs"

/* Tsss... Don't show this to anybody! */
export const getUserNormalized = (user: User) => {
   const opened: Order[] = fakeApi.checkout.orders.getByIds(user.openedOrders)

   const openedBooks: Book[] = fakeApi.users.userBooks.getUserBooksByIds(opened.map(o => o.bookId))

   const closed: Order[] = fakeApi.checkout.orders.getByIds(user.closedOrders)
   const closedBooks: Book[] = fakeApi.users.userBooks.getUserBooksByIds(closed.map(o => o.bookId))
   const closedPrices: number[] = closedBooks.map(cb => fakeApi.library.books.getPrice(cb.abstractBook))

   const reserved: Reservation[] = fakeApi.checkout.reservations.getByIds(user.reservations)
   const reservedBooks: AbstractBook[] = fakeApi.library.books.getByIds(reserved.map(o => o.aBookId))

   return {
      opened,
      openedBooks,
      closed,
      closedBooks,
      closedPrices,
      reserved,
      reservedBooks,
   }
}

export const getUserStat = (user: User) => {
   const un = getUserNormalized(user)

   // If we consider that the price of a book decreases on average by 4 times compared to the original.
   const saved = un.closedPrices.reduce((a, b) => a + b, 0) * (4 - 1)

   return {
      saved: `~ ${saved} $`,
      registered: dayjs(user.registeredAt).format("D MMM YYYY"),
   }
}

export const getOrderInfo = (order: Order) => {
   const { status, deliveredAt, endAt } = order

   if (status === "WAITING_TRANSFER") {
      const diff = dayjs(deliveredAt).diff(dayjs(), "days")
      return `Will be delivered in ${diff} days`
   }
   if (status === "RENTED") {
      const diff = dayjs(endAt).diff(dayjs(), "days")
      return `Remained: ${diff} ${diff === 1 ? "day" : "days"}`
   }

   return ""
}

export const getReservationInfo = (reservation: Reservation) => {
   const queryIdx = fakeApi.checkout.reservations.getUserIdx(reservation.userId, reservation.aBookId)
   const awaitTime = queryIdx * 7
   const couldBeRent = queryIdx === 0

   return { queryIdx, awaitTime, couldBeRent }
}
