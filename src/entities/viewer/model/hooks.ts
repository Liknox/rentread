import { useStoreMap, useUnit } from "effector-react"
import { fav } from "./stores"
import { bookModel } from "entities/book"

export const useBookFavStatus = (bookId: number) => {
   const isBookFav = useStoreMap({
      store: fav.$store,
      keys: [bookId],
      fn: (state, [bookId]) => state.includes(bookId),
   })

   return { isBookFav }
}

export const useFavBooks = () => {
   const books = bookModel.useBooks()
   const favIds = useUnit(fav.$store)
   return books.filter(b => favIds.includes(b.id))
}
