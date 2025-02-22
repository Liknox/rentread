export const TARIFFS = {
   T7: 7,
   T14: 14,
   T30: 30,
}

export const PRICES = {
   MIN: 0,
   MAX: 50,
}

/** profile topics/anchors */
export const TOPIC_OPENED = {
   id: "opened",
   title: "Rented",
   fullTitle: "Rented books",
   description: "Books on hands",
}

export const TOPIC_RESERVED = {
   id: "reserved",
   title: "Reserved",
   fullTitle: "Reserved Books",
   description: "Added to a rent queue",
}

export const TOPIC_HISTORY = {
   id: "history",
   title: "History",
   fullTitle: "Rent history",
   description: "Recent orders books",
}

export const TOPIC_FAV = {
   id: "fav",
   title: "Favorites",
   fullTitle: "Books in Favorites",
   description: "Favorite books",
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
