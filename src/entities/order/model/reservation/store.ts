import { viewerLib } from "entities/viewer"
import { fakeApi } from "shared/api"
import { browser } from "shared/lib"
import * as events from "./events"

// FIXME: fetch later by API
export const initialState: number[] = viewerLib
   .getUserNormalized(fakeApi.users.users.getViewer())
   .reserved.map(r => r.aBookId)

export const $reservations = browser
   .createPersistStore(initialState, { name: "entities/order/reservation" })
   .on(events.toggleBook, (state, payload) => {
      if (state.includes(payload)) {
         return state.filter(it => it !== payload)
      }
      return [...state, payload]
   })
