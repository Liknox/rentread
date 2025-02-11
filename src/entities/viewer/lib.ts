import { AbstractBook, Book, Order, Reservation, User, fakeApi } from "@shared/api"

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
