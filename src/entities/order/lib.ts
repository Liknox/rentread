import { Book, fakeApi } from "@shared/api"
import dayjs from "dayjs"

const getRentStats = (userBooks: Book[]) => {
   return userBooks.map(ub => {
      const maxDuration = dayjs(ub.availableBefore).diff(dayjs(), "day")
      const orders = fakeApi.checkout.orders.getByBookId(ub.id).sort((a, b) => a.id - b.id)
      const lastStatus = orders.slice(-1)[0]?.status

      const couldBeRent = !orders.length || lastStatus === "CLOSED"

      return {
         book: ub,
         maxDuration,
         couldBeRent,
      }
   })
}

