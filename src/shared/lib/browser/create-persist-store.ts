import { createStore } from "effector"
import type { StoreWritable } from "effector"
import { initLSItem } from "./use-local-storage"

export function createPersistStore<T>(initialState: T, { name }: { name: string }): StoreWritable<T> {
   const lsItem = initLSItem<T>(name, initialState)
   const persistedState = lsItem.value

   const $store = createStore<T>(persistedState)
   $store.watch(state => {
      lsItem.setValue(state)
   })

   return $store
}
