import { browser } from "@shared/lib"
import * as events from "./events"
import { fakeApi } from "@shared/api"

const balance = fakeApi.users.users.getViewer().wallet!.moneyCount
export const walletInitialState: number = balance

export const $wallet = browser
   .createPersistStore<number>(walletInitialState, { name: "entities/viewer/fakeWallet" })
   .on(events.deposit, (state, payload) => {
      if (typeof payload === "number") {
         return state + payload
      }
      return state
   })
