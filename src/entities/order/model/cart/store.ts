import { create } from "zustand"

// TODO: change
export const DEFAULT_DURATION = 7

export interface CartBooksState {
   cartBooks: number[]
   toggleBook: (bookId: number) => void
   reset: () => void
}

// FIXME: init later by API
export const booksInitialState: number[] = []

export const useCartBooksStore = create<CartBooksState>(set => {
   const lsItem = initLSItem<number[]>("temp-cart-books", booksInitialState)

   return {
      cartBooks: lsItem.value,
      toggleBook: (bookId: number) =>
         set(state => {
            let newBook

            if (state.cartBooks.includes(bookId)) {
               newBook = { cartBooks: state.cartBooks.filter(id => id !== bookId) }
            } else {
               newBook = { cartBooks: [...state.cartBooks, bookId] }
            }

            lsItem.setValue(newBook.cartBooks)

            return { ...newBook }
         }),
      reset: () => {
         lsItem.setValue([])
         set({ cartBooks: [] })
      },
   }
})

export const $durations = browser
   .createPersistStore(durationsInitialState, { name: PERSIST_STORE_ITEMS.cartDuration })
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
   .createPersistStore(initialDelivery, { name: PERSIST_STORE_ITEMS.cartDelivery })
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

      $books.reset()

      return []
   },
   target: [$books, $durations],
})
