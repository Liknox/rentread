import type { SectionsDisplay } from "@shared/api"
import { Authors, Banner, Books, Categories } from "../ui"

export const sections: SectionsDisplay = [
   {
      id: 1,
      Section: Banner,
   },
   {
      id: 2,
      title: "Book Categories",
      Section: Categories,
   },
   {
      id: 3,
      title: "Popular Authors",
      Section: Authors,
   },
   {
      id: 4,
      title: "Popular Authors",
      Section: Books,
   },
]
