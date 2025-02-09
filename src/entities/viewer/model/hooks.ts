import { useStoreMap } from "effector-react"
import { fav } from "./stores"

export const useBookFavStatus = (bookId: number) => {
   const isBookFav = useStoreMap({
      store: fav.$store,
      keys: [bookId],
      fn: (state, [bookId]) => state.includes(bookId),
   })

   return { isBookFav }
}
