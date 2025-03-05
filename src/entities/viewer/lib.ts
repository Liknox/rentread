import { TRANSLATIONS } from "@app/configs/constants/translation"
import type { AbstractBook, Book, Order, Reservation, User } from "@shared/api"
import { fakeApi } from "@shared/api"
import dayjs from "dayjs"
import { useTranslation } from "react-i18next"

/* Tsss... Don't show this to anybody! */
export const getUserNormalized = (user: User) => {
   const opened: Order[] = fakeApi.checkout.orders.getByIds(user.openedOrders)

   const openedBooks: Book[] = fakeApi.users.userBooks.getUserBooksByIds(opened.map(o => o.bookId))

   const closed: Order[] = fakeApi.checkout.orders.getByIds(user.closedOrders)
   const closedBooks: Book[] = fakeApi.users.userBooks.getUserBooksByIds(closed.map(o => o.bookId))
   const closedPrices: number[] = closedBooks.map(cb => fakeApi.library.books.getPrice(cb.abstractBook))
   const savedMoney = openedBooks.map(cb => fakeApi.library.books.getPrice(cb.abstractBook))

   const reserved: Reservation[] = fakeApi.checkout.reservations.getByIds(user.reservations)
   const reservedBooks: AbstractBook[] = fakeApi.library.books.getByIds(reserved.map(o => o.aBookId))

   return {
      opened,
      openedBooks,
      closed,
      closedBooks,
      closedPrices,
      savedMoney,
      reserved,
      reservedBooks,
   }
}

export const getUserStat = (user: User) => {
   const un = getUserNormalized(user)

   // If we consider that the price of a book decreases on average by 4 times compared to the original.
   const saved = un.savedMoney.reduce((a, b) => a + b, 0) * (2 - 1)

   return {
      saved: `~ ${saved} $`,
      registered: dayjs(user.registeredAt).format("D MMM YYYY"),
   }
}

export const useOrderInfo = (order: Order) => {
   const { status, deliveredAt, endAt } = order
   const { t } = useTranslation()

   if (status === "WAITING_TRANSFER") {
      const diff = dayjs(deliveredAt).diff(dayjs(), "days")
      return `${t(TRANSLATIONS.timezone.willBe)} ${diff} ${t(diff > 1 ? (diff >= 2 && diff < 5 ? TRANSLATIONS.timezone.days : TRANSLATIONS.timezone.dayss) : TRANSLATIONS.timezone.day)}`
   }
   if (status === "RENTED") {
      const diff = dayjs(endAt).diff(dayjs(), "days")
      return `${t(TRANSLATIONS.timezone.remained)} ${diff} ${t(diff > 1 ? (diff >= 2 && diff < 5 ? TRANSLATIONS.timezone.days : TRANSLATIONS.timezone.dayss) : TRANSLATIONS.timezone.day)}`
   }

   return ""
}

export const getReservationInfo = (reservation: Reservation) => {
   const queryIdx = fakeApi.checkout.reservations.getUserIdx(reservation.userId, reservation.aBookId)
   const awaitTime = queryIdx * 7
   const couldBeRent = queryIdx === 0

   return { queryIdx, awaitTime, couldBeRent }
}
