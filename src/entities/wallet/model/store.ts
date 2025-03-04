import { PERSIST_STORE_ITEMS } from "@app/configs/constants"
import { fakeApi } from "@shared/api"
import { browser } from "@shared/lib"
import * as events from "./events"

const balance = fakeApi.users.users.getViewer().wallet!.moneyCount
export const walletInitialState: number = balance

export const $wallet = browser
   .createPersistStore<number>(walletInitialState, { name: PERSIST_STORE_ITEMS.fakeWallet })
   .on(events.deposit, (state, payload) => {
      if (typeof payload === "number") {
         return state + payload
      }
      return state
   })
