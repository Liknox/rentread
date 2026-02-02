import { useReserveStore } from "./store"

export const useBookReservationStatus = (bookId: number) => {
  return useReserveStore(state => state.reserve.includes(bookId))
}
