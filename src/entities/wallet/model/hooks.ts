import { useState } from "react"
import { useWalletStore } from "./store"
import { TIMEOUT } from "@app/configs/constants"

export const useViewerWallet = () => {
   const wallet = useWalletStore()
   const [paymentPending, setPaymentPending] = useState(false)

   const applyTransaction = (amount: number) => {
      setPaymentPending(true)
      return new Promise(resolve => {
         setTimeout(() => {
            wallet.deposit(amount)
            setPaymentPending(false)
            resolve({ status: 200 })
         }, TIMEOUT.APPLY_TRANSACTION)
      })
   }

   const payment = {
      isPending: paymentPending,
      applyTransaction,
   }

   return { wallet: wallet.wallet, payment }
}
