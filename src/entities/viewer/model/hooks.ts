import { useStoreMap, useUnit } from "effector-react"
import { bookModel } from "entities/book"
import { fav } from "./stores"
import { browser } from "@shared/lib"
import { useState } from "react"

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

const WALLET_MONEY = 300

export const useViewerWallet = () => {
   // const wallet = useViewer().wallet;
   const [wallet, setWallet] = browser.useLocalStorage("fakeWallet", WALLET_MONEY)
   const [paymentPending, setPaymentPending] = useState(false)

   const applyTransaction = (diff: number) => {
      setPaymentPending(true)

      return new Promise(resolve => {
         setTimeout(() => {
            setWallet(wallet + diff)
            setPaymentPending(false)
            resolve({ status: 200 })
         }, 1000)
      })
   }

   const payment = {
      isPending: paymentPending,
      applyTransaction,
   }

   return { wallet, payment }
}
