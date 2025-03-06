import { useReserveStore } from "./store"

export const useBookReservationStatus = (bookId: number) => {
   const isBookReserved = useReserveStore(state => state.reserve.includes(bookId))

   return { isBookReserved }
}
