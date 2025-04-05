// cSpell:disable
import dayjs from "dayjs"

import type { CoffeeShop } from "../../types"

export const SVIT_KAVY: CoffeeShop = {
   id: 1,
   name: "Svit Kavy",
   address: "Chornovola, 12",
   deliveryAt: dayjs().add(4, "days").toISOString(),
}

export const YELLOW_PLACE: CoffeeShop = {
   id: 2,
   name: "Yellow Place",
   address: "Liberty Avenue, 28",
   deliveryAt: dayjs().add(7, "days").toISOString(),
}

export const ONEBAR: CoffeeShop = {
   id: 3,
   name: "OneBar",
   address: "High Castle street, 1",
   deliveryAt: dayjs().add(1, "days").toISOString(),
}

export const getAll = () => [SVIT_KAVY, YELLOW_PLACE, ONEBAR]
