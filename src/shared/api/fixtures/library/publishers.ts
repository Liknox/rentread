// cSpell: disable
import type { Publisher } from "@shared/api/types"

export const PENGUINS: Publisher = {
   id: 1,
   name: "Penguin Random House",
   city: "New York",
}

export const COLLINS: Publisher = {
   id: 2,
   name: "HarperCollins",
   city: "New York",
}

export const MACMILLAN: Publisher = {
   id: 3,
   name: "Macmillan Publishers",
   city: "London",
}

export const SIMON_SHUSTER: Publisher = {
   id: 4,
   name: "Simon & Schuster",
   city: "New York",
}

export const HACHETTE: Publisher = {
   id: 5,
   name: "Hachette Book Group",
   city: "Paris",
}

export const SCHOLASTIC: Publisher = {
   id: 6,
   name: "Scholastic",
   city: "New York",
}

export const BLOOMSBURY: Publisher = {
   id: 7,
   name: "Bloomsbury Publishing",
   city: "London",
}

export const OXFORD: Publisher = {
   id: 8,
   name: "Oxford University Press",
   city: "Oxford",
}

export const WILEY: Publisher = {
   id: 9,
   name: "Wiley",
   city: "Hoboken",
}

export const SPRINGER: Publisher = {
   id: 10,
   name: "Springer Nature",
   city: "Berlin",
}

export const getNameString = (entity: Publisher) => entity.name
