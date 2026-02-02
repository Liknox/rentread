import { create } from "zustand"

import { PERSIST_STORE_ITEMS } from "@app/configs/constants"
import { initLSItem } from "@shared/lib/browser"
import { fakeApi } from "@shared/api"

interface FavState {
  fav: number[]
  toggleBook: (bookId: number) => void
}

const initialState: number[] = fakeApi.users.users.getViewer().favABooks

export const useFavStore = create<FavState>(set => {
  const lsItem = initLSItem<number[]>(PERSIST_STORE_ITEMS.fav, initialState)
  lsItem.setValue(initialState)

  return {
    fav: lsItem.value,
    toggleBook: (bookId: number) =>
      set(state => {
        let newFav

        if (state.fav.includes(bookId)) {
          newFav = { fav: state.fav.filter(id => id !== bookId) }
        } else {
          newFav = { fav: [...state.fav, bookId] }
        }

        lsItem.setValue(newFav.fav)

        return { ...newFav }
      }),
  }
})
