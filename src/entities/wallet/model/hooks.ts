import { useState } from "react"
import { useWalletStore } from "./store"

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
         }, 1000)
      })
   }

   const payment = {
      isPending: paymentPending,
      applyTransaction,
   }

   return { wallet: wallet.wallet, payment }
}
