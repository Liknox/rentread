import { fakeApi } from "@shared/api"
import { bookModel } from "entities/book"
import * as lib from "../lib"
import { useFavStore } from "./store"

export const useBookFavStatus = (bookId: number) => {
   const isBookFav = useFavStore(state => state.fav.includes(bookId))

   return { isBookFav }
}

export const useFavBooks = () => {
   const books = bookModel.useBooks()
   const favIds = useFavStore()

   return books.filter(b => favIds.fav.includes(b.id))
}

export const useViewer = () => {
   return fakeApi.users.users.getViewer()
}

export const useViewerNormalized = () => {
   const viewer = useViewer()

   return lib.getUserNormalized(viewer)
}
