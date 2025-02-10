import { useStoreMap } from "effector-react"
// import { bookModel } from "entities/books";
import { $reservations } from "./store"

export const useBookReservationStatus = (bookId: number) => {
   const isBookReserved = useStoreMap({
      store: $reservations,
      keys: [bookId],
      fn: (state, [bookId]) => state.includes(bookId),
   })

   return { isBookReserved }
}
