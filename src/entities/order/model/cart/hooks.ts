import { useStoreMap } from "effector-react"
import { $books } from "./store"

export const useBookStatus = (bookId: number) => {
   const isBookInCart = useStoreMap({
      store: $books,
      keys: [bookId],
      fn: (state, [bookId]) => state.includes(bookId),
   })

   return { isBookInCart }
}
