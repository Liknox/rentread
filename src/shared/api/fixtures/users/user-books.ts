import dayjs from "dayjs"

import type { Book } from "../../types"
import { books } from "../library"

// === RELATIONS: userBooks
//
// FIXME: @hardcoded @temp @lowCoupling
// let bookSize = 0;
// const PRICE_OFFSET = 50;
//
// const prices = [
//     price - PRICE_OFFSET * 1.5,
//     price - PRICE_OFFSET,
//     price,
//     price + PRICE_OFFSET,
//     price + PRICE_OFFSET * 1.5,
// ];

// prettier-ignore
const dates = [
  dayjs().add(14, "days").toISOString(),
  dayjs().add(28, "days").toISOString(),
  dayjs()
    .add(52, "days")
    .toISOString(),
  // "2021-06-10T00:24:35.354Z",
  // "2021-07-17T00:24:35.354Z",
  // "2021-08-28T00:24:35.354Z",
]

export const USER_ABOOKS: Record<number, number[]> = {
  0: [],
  1: [15, 1, 17],
  2: [12, 10, 3, 11, 18],
  3: [3, 8, 31, 2],
  4: [25, 16, 4, 32],
  5: [2, 6, 7],
  6: [1, 2, 30, 4, 5],
  7: [6, 7, 8, 9, 10],
  8: [11, 12, 13, 14, 15],
  9: [16, 17, 18, 19, 20],
  10: [21, 22, 23, 24, 25],
  11: [26, 27, 28, 29, 30],
}

// FIXME: HARDCODED
export const USERS_UBOOKS: Record<number, number[]> = {
  0: [],
  1: [1, 2, 3],
  2: [4, 5, 6, 7, 8],
  3: [9, 10, 11, 12],
  4: [13, 14, 15, 16],
  5: [17, 18, 19],
  6: [20, 21, 22, 23, 24],
  7: [25, 26, 27, 28, 29],
  8: [30, 31, 32, 33, 34],
  9: [35, 36, 37, 38, 39],
  10: [40, 41, 42, 43, 44],
  11: [45, 46, 47, 48, 49],
}

/**
 * The code below may cause epilepsy.
 *
 * Be careful, you've been warned.
 *
 * There was an idea to map IDs based on iteratively adding to a counter variable.
 * But since the order of books in USER_ABOOKS and the actual order from 1 to 32
 * (for AbstractBook) differs,
 * another tough decision was made—to map directly using our maps!
 * (they're called maps for a reason, right?)
 *
 * Yes, this way, all functionality is concentrated within them.
 *
 * But at the moment, it was hard to come up with a better (or faster) solution.
 */
export const userBooksMap = Object.entries(USER_ABOOKS).map(([key, aBookIds]) => {
  const userId = Number(key)
  const userBooks: Book[] = aBookIds.map((aId, idx) => {
    const abstract = books.getById(aId)
    if (!abstract) throw new Error(`Unknown AbstractBook with id=${aId}`)
    // const price = books.getPrice(abstract);

    return {
      id: USERS_UBOOKS[userId][idx],
      abstractBook: abstract,
      // costPerDay: price,
      availableBefore: dates[idx % dates.length],
    }
  })
  return userBooks
})

// // FIXME: @hardcoded
// export const userBooksMap = new Array(books.getAll().length + 1)
//     .fill(0)
//     .map((_, idx) => createUserBooks(idx));

export const userBooks = userBooksMap.flat()

export const getUserBookById = (userBookId: number) => {
  return userBooks.find(ub => userBookId === ub.id)
}
export const getUserBooksByIds = (userBookIds: number[]) => {
  return userBookIds.map(id => getUserBookById(id)!)
}

export const getUserBooksByABook = (aBookId: number) => {
  return userBooks.filter(ub => ub.abstractBook.id === aBookId)
}

export const shuffleByABook = (aBookId: number) => {
  const userBooks = getUserBooksByABook(aBookId)
  const idx = Math.floor(Math.random() * userBooks.length)
  return userBooks[idx]
}
