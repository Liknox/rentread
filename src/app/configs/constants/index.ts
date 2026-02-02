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

export const SERVICE_FEE = 0.07

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

export const TOPICS = [TOPIC_OPENED, TOPIC_RESERVED, TOPIC_FAV, TOPIC_HISTORY]

/** routes */
export const ROUTES = {
  DEFAULT: "/",
  BOOKID: "/book/$bookId",
  BOOK: "/book",
  ABOUT: "/about",
  CATALOG: "/catalog",
  PROFILE: "/profile",
  PROFILE_OPENED: "/profile#opened",
  PROFILE_FAV: "/profile#fav",
  PROFILE_RESERVED: "/profile#reserved",
  ORDER: "/order",
  CHECKOUT: "/order/checkout",
  RESULT: "/order/result/$result",
  NOTFOUND: "/__404",
  DEBUG: "/debug",
  ALL: "/*",
}

export const MAP_ANCHORS: Record<string, [number, number]> = {
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

export const TIMEOUT = {
  APPLY_TRANSACTION: 1e3 * 2,
  PARAM_DEBOUNCE: 1e2 * 5,
  FORCE_UPDATE: 1e1 * 2,
}

export const CAROUSEL_TIMER = 3 * 1e3

export const BOOKS_PER_PAGE = 6

export const DEFAULT_SORTING = 1
export const SORTINGS = {
  1: TRANSLATIONS.catalog.sortBy.options.novelty,
  2: TRANSLATIONS.catalog.sortBy.options.price,
  3: TRANSLATIONS.catalog.sortBy.options.time,
  4: TRANSLATIONS.catalog.sortBy.options.popularity,
}

export const SKELETON_DELAY = 1.5 * 1e3

export const SKELETON_KEYS = {
  AUTHOR: "authors",
  CATEGORY: "cat",
  BOOK: "books",
  BANNER: "banner",
  BOOK_ROW: "book-row",
  BOOK_CARD: "book-card",
  SECTION: "section",
}
