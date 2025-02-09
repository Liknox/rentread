import { browser } from "@shared/lib"
import * as events from "./events"

// FIXME: init later by API
export const booksInitialState: number[] = []

export const $books = browser
   .createPersistStore(booksInitialState, { name: "entities/order/cart--books" })
   .on(events.toggleBook, (state, payload) => {
      if (state.includes(payload)) {
         return state.filter(it => it !== payload)
      }
      return [...state, payload]
   })
