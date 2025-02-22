import { createEvent } from "effector"

export const setBookDuration = createEvent<{ bookId: number; duration: number | undefined }>()

export const toggleBook = createEvent<number>()

export const submitOrder = createEvent()

export const setDelivery = createEvent<{
   date?: string
   address?: string
}>()
