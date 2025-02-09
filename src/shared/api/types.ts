import type { FC } from "react"

export type User = {
   id: number
   books: number[]
   // chats: Chat[]
   // closedOrders: Order[];
   // openedOrders: Order[];
   // reservations: Reservation[];
   closedOrders: number[]
   openedOrders: number[]
   reservations: number[]
   favABooks: number[]
   email: string
   emailVerified: boolean
   firstName: string
   middleName?: string
   lastName: string
   roles: Role[]
   statusBan: boolean
   wallet?: Wallet
   registeredAt: string
}

export type Order = {
   id: number
   bookId: number
   userId: number
   startAt: string
   deliveredAt: string
   endAt: string
   costs: number
   status: "WAITING_TRANSFER" | "RENTED" | "CLOSED"
}

export type Reservation = {
   id: number
   aBookId: number
   userId: number
   //     +1-2 days for selection, but we can't plan for 7 or 30 days in advance—the person chooses.
   // Basically, we put them 'in line' for the book without much specificity.
   reservedAt: string
   status: "PENDING" | "REJECTED" | "RESOLVED"
}

export type AbstractBook = {
   id: number
   name: string
   description: string
   authors: Author[]
   publicationYear: number
   publishingHouse: Publisher
   category: Category
}

export type Role = {
   id: number
   name: string
}

export type Wallet = {
   // id: number;
   moneyCount: number
   // transactions: Transaction[];
   // userId: number;
}

export type Book = {
   id: number
   abstractBook: AbstractBook
   // costPerDay: number;
   availableBefore: string
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
