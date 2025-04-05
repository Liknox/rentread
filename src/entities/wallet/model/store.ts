import { create } from "zustand"

import { PERSIST_STORE_ITEMS } from "@app/configs/constants"
import { fakeApi } from "@shared/api"
import { initLSItem } from "@shared/lib/browser"

export interface WalletState {
   wallet: number
   deposit: (amount: number) => void
}

export const useWalletStore = create<WalletState>(set => {
   const balance = fakeApi.users.users.getViewer().wallet?.moneyCount
   const lsItem = initLSItem<number>(PERSIST_STORE_ITEMS.fakeWallet, balance)
   lsItem.setValue(balance)

   return {
      wallet: lsItem.value,
      deposit: (amount: number) =>
         set(state => {
            const newWallet = state.wallet + amount
            lsItem.setValue(newWallet)
            return { wallet: newWallet }
         }),
   }
})
