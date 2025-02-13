export const TARIFFS = {
   T7: 7,
   T14: 14,
   T30: 30,
}

export const PRICES = {
   MIN: 0,
   MAX: 50,
}

/** profile topics */
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

export const TOPIC_CLOSED = {
   id: "closed",
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

// prettier-ignore
export const topics = [TOPIC_OPENED, TOPIC_RESERVED, TOPIC_FAV, TOPIC_CLOSED]
