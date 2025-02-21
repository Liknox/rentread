import { type Order, fakeApi } from "@shared/api"
import { browser } from "@shared/lib"
import { combine, sample } from "effector"
import * as events from "./events"

import { v4 as uuid } from "uuid"

// TODO: change
export const DEFAULT_DURATION = 7

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

export const $cart = combine($books, $durations, (books, durations) => {
   return { books, durations }
})

sample({
   clock: events.submitOrder,
   source: $cart,
   fn: state => {
      const viewer = fakeApi.users.users.getViewer()
      const newOrders: Order[] = state.books.map(aBookId => {
         return fakeApi.checkout.orders.createOrder({
            bookId: fakeApi.users.userBooks.shuffleByABook(aBookId).id,
            userId: viewer.id,
            status: "WAITING_TRANSFER",
            startDelta: 0,
            deliveredDelta: 2,
            endDelta: state.durations[aBookId] || 14,
            costs: fakeApi.library.books.getPrice(fakeApi.library.books.getById(aBookId)!),
         })
      })

      viewer.openedOrders.push(...newOrders.map(no => no.id))

      fakeApi.checkout.orders.__pushTo(...newOrders)
      fakeApi.users.users.__updateUser(viewer)

      setTimeout(() => {
         window.location.replace(`/order/result/${uuid()}`)
      }, 0)

      $books.reset()

      return []
   },
   target: [$books, $durations],
})
