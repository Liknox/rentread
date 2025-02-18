import { browser } from "@shared/lib"
import * as events from "./events"

export const DEFAULT_DURATION = 14

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

export const durationsInitialState: Record<number, number> = {}

export const $durations = browser
   .createPersistStore(durationsInitialState, { name: "entities/order/cart--duration" })
   .on(events.setBookDuration, (state, { bookId, duration }) => {
      if (duration === undefined) {
         delete state[bookId]
         return state
      }
      return { ...state, [bookId]: duration }
   })
   .on(events.toggleBook, (state, bookId) => {
      // !!! FIXME
      const duration = state[bookId] ? undefined : DEFAULT_DURATION
      if (duration === undefined) {
         // console.log("before", state);
         delete state[bookId]
         // console.log("after", state);
         return state
      }
      return { ...state, [bookId]: duration }
      // events.setBookDuration({ bookId: payload, duration });
   })
   .on(events.submitOrder, () => {
      console.log("$durations SUBMIT")
      return {}
   })

const initialDelivery = {
   date: "",
   address: "",
}

export const $delivery = browser
   .createPersistStore(initialDelivery, {
      name: "entities/order/cart--delivery",
   })
   .on(events.setDelivery, (state, payload) => {
      return {
         date: payload.date ?? state.date,
         address: payload.address ?? state.address,
      }
   })

