import { TRANSLATIONS } from "./translation"

export const TARIFFS = {
   T7: 7,
   T14: 14,
   T30: 30,
}

export const PRICES = {
   MIN: 5,
   MAX: 30,
}

export const DEFAULT_ORDER_DURATION = 7

/** profile topics/anchors */
export const TOPIC_OPENED = {
   id: "opened",
   title: TRANSLATIONS.anchors.rented.title,
   fullTitle: TRANSLATIONS.anchors.rented.fullTitle,
   description: TRANSLATIONS.anchors.rented.description,
}

export const TOPIC_RESERVED = {
   id: "reserved",
   title: TRANSLATIONS.anchors.reserved.title,
   fullTitle: TRANSLATIONS.anchors.reserved.fullTitle,
   description: TRANSLATIONS.anchors.reserved.description,
}

export const TOPIC_HISTORY = {
   id: "history",
   title: TRANSLATIONS.anchors.history.title,
   fullTitle: TRANSLATIONS.anchors.history.fullTitle,
   description: TRANSLATIONS.anchors.history.description,
}

export const TOPIC_FAV = {
   id: "fav",
   title: TRANSLATIONS.anchors.favorites.title,
   fullTitle: TRANSLATIONS.anchors.favorites.fullTitle,
   description: TRANSLATIONS.anchors.favorites.description,
}

export const topics = [TOPIC_OPENED, TOPIC_RESERVED, TOPIC_FAV, TOPIC_HISTORY]

/** routes */
export const routes = {
   DEFAULT: "/",
   BOOKID: "/book/$bookId",
   BOOK: "/book",
   ABOUT: "/about",
   CATALOG: "/catalog",
   PROFILE: "/profile",
   PROFILE_FAV: "/profile#fav",
   PROFILE_RESERVED: "/profile#reserved",
   ORDER: "/order",
   CHECKOUT: "/order/checkout",
   RESULT: "/order/result/$result",
   NOTFOUND: "/__404",
   DEBUG: "/debug",
   ALL: "/*",
}

type MapAnchorsType = { [key: string]: [number, number] }

export const MAP_ANCHORS: MapAnchorsType = {
   DEFAULT: [49.8515, 24.0295],
   OPERA: [49.84403, 24.02625],
   MCDONALDS: [49.8564, 24.0224],
   HIHGCASTLE: [49.848, 24.036868],
}

export const PERSIST_STORE_ITEMS = {
   fakeWallet: "entities/viewer/fakeWallet",
   fav: "entities/viewer/fav",
   reservation: "entities/order/reservation",
   cartDelivery: "entities/order/cart--delivery",
   cartDuration: "entities/order/cart--duration",
   cartBooks: "entities/order/cart--books",
   demoAlert: "demoAlert/visible",
}
