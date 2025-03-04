import { fakeApi } from "@shared/api"
import { useUnit } from "effector-react"
import { useState } from "react"
import { $wallet } from "./store"
import { deposit } from "./events"

export const useWallet = () => useUnit($wallet)

export const useViewer = () => {
   return fakeApi.users.users.getViewer()
}

export const useViewerWallet = () => {
   const wallet = useWallet()
   const [paymentPending, setPaymentPending] = useState(false)

   const applyTransaction = (amount: number) => {
      setPaymentPending(true)
      return new Promise(resolve => {
         setTimeout(() => {
            deposit(amount)
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
