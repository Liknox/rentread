import { create } from "zustand"
import { viewerLib } from "entities/viewer"
import { fakeApi } from "shared/api"
import { initLSItem } from "@shared/lib/browser"

export interface ReserveState {
   reserve: number[]
   toggleBook: (bookId: number) => void
}

// FIXME: fetch later by API
const initialState: number[] = viewerLib.getUserNormalized(fakeApi.users.users.getViewer()).reserved.map(r => r.aBookId)

export const useReserveStore = create<ReserveState>(set => {
   const lsItem = initLSItem<number[]>("reservation", initialState)
   lsItem.setValue(initialState)

   return {
      reserve: lsItem.value,
      toggleBook: (bookId: number) =>
         set(state => {
            let newReserve

            if (state.reserve.includes(bookId)) {
               newReserve = { reserve: state.reserve.filter(id => id !== bookId) }
            } else {
               newReserve = { reserve: [...state.reserve, bookId] }
            }
            
            lsItem.setValue(newReserve.reserve)

            return { ...newReserve }
         }),
   }
})
