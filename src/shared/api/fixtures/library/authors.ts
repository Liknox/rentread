// cSpell: disable
import type { Author } from "@shared/api/types"

export const HEMINGWAY: Author = {
   id: 1,
   dateOfBirth: "1899-07-21T00:00:00",
   firstName: "Ernest",
   lastName: "Hemingway",
   avatar: { style: { color: "#b0a894" } },
}

export const PALAHNIUK: Author = {
   id: 2,
   dateOfBirth: "1962-02-21T00:00:00",
   firstName: "Chuck",
   lastName: "Palahniuk",
   avatar: { style: { color: "#94b0a3" } },
}

export const TALEB: Author = {
   id: 3,
   dateOfBirth: "1960-09-11T00:00:00",
   firstName: "Nassim",
   middleName: "Nicholas",
   lastName: "Taleb",
   avatar: { style: { color: "#b0949c" } },
}

export const FROST: Author = {
   id: 4,
   dateOfBirth: "1874-03-26T00:00:00",
   firstName: "Robert",
   lastName: "Frost",
}

export const BOB_MARTIN: Author = {
   id: 5,
   dateOfBirth: "1952-01-01T00:00:00",
   firstName: "Robert",
   middleName: "Cecil",
   lastName: "Martin",
}

export const SCHREIER: Author = {
   id: 6,
   dateOfBirth: "1987-05-10T00:00:00",
   firstName: "Jason",
   lastName: "Schreier",
}

export const NEIL_GAIMAN: Author = {
   id: 7,
   firstName: "Neil",
   lastName: "Gaiman",
   avatar: { style: { color: "#a994b0" } },
}

export const TERRY_PRATCHETT: Author = {
   id: 8,
   firstName: "Terry",
   lastName: "Pratchett",
}

export const MARTIN_FAULER: Author = {
   id: 9,
   firstName: "Martin",
   lastName: "Fauler",
}

export const ORWELL: Author = {
   id: 10,
   dateOfBirth: "1903-06-25T00:00:00",
   firstName: "George",
   lastName: "Orwell",
   avatar: { style: { color: "#94a7b0" } },
}

export const HUXLEY: Author = {
   id: 11,
   dateOfBirth: "1894-07-26T00:00:00",
   firstName: "Aldous",
   lastName: "Huxley",
}

export const SAPKOWSKI: Author = {
   id: 12,
   dateOfBirth: "1948-06-21T00:00:00",
   firstName: "Andrzej",
   lastName: "Sapkowski",
}

export const GEORGE_MARTIN: Author = {
   id: 13,
   dateOfBirth: "1948-09-20T00:00:00",
   firstName: "George",
   middleName: "R.R.",
   lastName: "Martin",
}

export const getShortname = (entity: Author) => `${entity.firstName} ${entity.lastName}`

export const getPopular = () => [GEORGE_MARTIN, PALAHNIUK, TALEB, NEIL_GAIMAN, ORWELL]
