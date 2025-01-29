import { FC } from "react"

export type AbstractBook = {
   id: number
   name: string
   description: string
   authors: Author[]
   publicationYear: number
   publishingHouse: Publisher
   category: Category
}

export type Author = {
   id: number
   dateOfBirth?: string
   firstName: string
   middleName?: string
   lastName: string
   avatar?: { style: { color: string } }
}

export type Publisher = {
   id: number
   name: string
   city: string
}

export type Category = {
   id: number
   name: string
   slug: string
   description: string
   cover?: { style: { color: string } }
}

export type SectionsRepresentation = {
   id: number
   title?: string
   Section: FC
}[]
