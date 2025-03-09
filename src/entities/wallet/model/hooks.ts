import { useState } from "react"
import { useWalletStore } from "./store"
import { TIMEOUT } from "@app/configs/constants"

export const useViewerWallet = () => {
   const walletStore = useWalletStore()
   const wallet = Number(walletStore.wallet.toFixed(2))
   const [paymentPending, setPaymentPending] = useState(false)

   const applyTransaction = (amount: number) => {
      setPaymentPending(true)
      return new Promise(resolve => {
         setTimeout(() => {
            const money = Number(amount.toFixed(2))
            walletStore.deposit(money)
            setPaymentPending(false)
            resolve({ status: 200 })
         }, TIMEOUT.APPLY_TRANSACTION)
      })
   }

   const payment = {
      isPending: paymentPending,
      applyTransaction,
   }

   return { wallet, payment }
}
