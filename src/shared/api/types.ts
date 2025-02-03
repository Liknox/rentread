import type { FC } from "react"

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

export type SectionsDisplay = {
   id: number
   title?: string
   Section: FC
}[]

export type BannerScreen = {
   id: number
   title: string
   subtitle: string
   description: string
   info: string
   link: boolean
   linkHref: string
   img: string
   imgAlt: string
}
