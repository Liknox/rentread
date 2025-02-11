import { useStoreMap, useUnit } from "effector-react"
import { $books } from "./store"
import { bookModel } from "entities/book"

export const useBookStatus = (bookId: number) => {
   const isBookInCart = useStoreMap({
      store: $books,
      keys: [bookId],
      fn: (state, [bookId]) => state.includes(bookId),
   })

   return { isBookInCart }
}

export const useOrderBooks = () => {
   const books = bookModel.useBooks()
   const orderIds = useUnit($books)
   return books.filter(b => orderIds.includes(b.id))
}
