import type { SectionsDisplay } from "@shared/api"
import { Authors, Banner, Books, Categories } from "../ui"
import { TRANSLATIONS } from "@app/configs/constants/translation"

export const sections: SectionsDisplay = [
   {
      id: 1,
      Section: Banner,
   },
   {
      id: 2,
      title: TRANSLATIONS.initial.sections.categories.title,   
      Section: Categories,
   },
   {
      id: 3,
      title: TRANSLATIONS.initial.sections.authors.title,
      Section: Authors,
   },
   {
      id: 4,
      title: TRANSLATIONS.initial.sections.books.title,
      Section: Books,
   },
]
