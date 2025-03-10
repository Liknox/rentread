import { PRICES, TARIFFS, TIMEOUT } from "@app/configs/constants"
import { TRANSLATIONS } from "@app/configs/constants/translation"
import { useRef } from "react"

/** @query Filter: by author */
export const useFilterByAuthor = () => {
   const [searchParams, setSearchParams] = useSearchParams()

   const authors = searchParams.get("authors")
      ? String(searchParams.get("authors"))
           .split("_")
           .map(item => (item ? Number(item) : null))
           .filter((item): item is number => item !== null)
      : []

   const setAuthors = (value: number[]) => {
      const newSearchParams = new URLSearchParams(searchParams)

      if (value.length > 0) {
         newSearchParams.set("authors", value.length === 1 ? value[0].toString() : value.join("_"))
      } else {
         newSearchParams.delete("authors")
      }

      setSearchParams(newSearchParams, { replace: true })
   }

   return { authors, setAuthors }
}

/** @query Filter: by publisher */
export const useFilterByPublisher = () => {
   const [searchParams, setSearchParams] = useSearchParams()

   const publishers = searchParams.get("pub")
      ? String(searchParams.get("pub"))
           .split("_")
           .map(item => (item ? Number(item) : null))
           .filter((item): item is number => item !== null)
      : []

   const setPublishers = (value: number[]) => {
      const newSearchParams = new URLSearchParams(searchParams)

      if (value.length > 0) {
         newSearchParams.set("pub", value.length === 1 ? value[0].toString() : value.join("_"))
      } else {
         newSearchParams.delete("pub")
      }

      setSearchParams(newSearchParams, { replace: true })
   }

   return { publishers, setPublishers }
}

/** @query Filter: by category */
export const useFilterByCategory = () => {
   const [searchParams, setSearchParams] = useSearchParams()

   const categories = searchParams.get("cat")
      ? String(searchParams.get("cat"))
           .split("_")
           .map(item => (item ? Number(item) : null))
           .filter((item): item is number => item !== null)
      : []

   const setCategories = (value: number[]) => {
      const newSearchParams = new URLSearchParams(searchParams)

      if (value.length > 0) {
         newSearchParams.set("cat", value.length === 1 ? value[0].toString() : value.join("_"))
      } else {
         newSearchParams.delete("cat")
      }

      setSearchParams(newSearchParams, { replace: true })
   }

   return { categories, setCategories }
}

/** @query Filter: by existence */
import { useSearchParams } from "react-router-dom"

export const useExistsOnly = () => {
   const [searchParams, setSearchParams] = useSearchParams()

   const DEFAULT_EXISTS_ONLY = false
   const existsOnly = searchParams.get("existsOnly") === "true" || DEFAULT_EXISTS_ONLY

   const setExistsOnly = (value: boolean) => {
      const newSearchParams = new URLSearchParams(searchParams)

      if (value) {
         newSearchParams.set("existsOnly", "true")
      } else {
         newSearchParams.delete("existsOnly")
      }

      // Оновлюємо URL без перезавантаження сторінки
      setSearchParams(newSearchParams, { replace: true })
   }

   return { existsOnly, setExistsOnly }
}

/** @query Filter: by terms of rent */
export const useTariff = () => {
   const [searchParams, setSearchParams] = useSearchParams()
   const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

   const tariff = Number(searchParams.get("tariff")) || TARIFFS.T7

   const setTariff = (tariff: number) => {
      if (timerRef.current) {
         clearTimeout(timerRef.current)
      }

      timerRef.current = setTimeout(() => {
         const newSearchParams = new URLSearchParams(searchParams)

         if (tariff !== TARIFFS.T7) {
            newSearchParams.set("tariff", tariff.toString())
         } else {
            newSearchParams.delete("tariff")
         }

         setSearchParams(newSearchParams, { replace: true })
      }, TIMEOUT.PARAM_DEBOUNCE)
   }

   return { tariff, setTariff }
}

/** @query Filter: by prices */
export const usePrices = () => {
   const [searchParams, setSearchParams] = useSearchParams()
   const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

   const from = Number(searchParams.get("pf")) || PRICES.MIN
   const to = Number(searchParams.get("pt")) || PRICES.MAX

   const setPrice = (from: number, to: number) => {
      if (timerRef.current) {
         clearTimeout(timerRef.current)
      }

      timerRef.current = setTimeout(() => {
         const newSearchParams = new URLSearchParams(searchParams)

         if (from !== PRICES.MIN || to !== PRICES.MAX) {
            newSearchParams.set("pf", from.toString())
            newSearchParams.set("pt", to.toString())
         } else {
            newSearchParams.delete("pf")
            newSearchParams.delete("pt")
         }

         setSearchParams(newSearchParams, { replace: true })
      }, TIMEOUT.PARAM_DEBOUNCE)
   }

   return { from, to, setPrice }
}

const DEFAULT_SORTING = 4
export const SORTINGS = {
   1: TRANSLATIONS.catalog.sortBy.options.popularity,
   2: TRANSLATIONS.catalog.sortBy.options.price,
   3: TRANSLATIONS.catalog.sortBy.options.time,
   4: TRANSLATIONS.catalog.sortBy.options.novelty,
}

export const useSorting = () => {
   const [searchParams, setSearchParams] = useSearchParams()

   const sorting = Number(searchParams.get("sort")) || DEFAULT_SORTING

   const setSorting = (value: number) => {
      const newSearchParams = new URLSearchParams(searchParams)

      if (value !== DEFAULT_SORTING) {
         newSearchParams.set("sort", value.toString())
      } else {
         newSearchParams.delete("sort")
      }

      setSearchParams(newSearchParams, { replace: true })
   }

   return { sorting, setSorting }
}

export const VIEW_TYPE = {
   grid: "grid" as const,
   list: "list" as const,
}

type ViewTypeValue = (typeof VIEW_TYPE)[keyof typeof VIEW_TYPE]

export const defaultViewType = VIEW_TYPE.list

export const useViewType = () => {
   const [searchParams, setSearchParams] = useSearchParams()

   // Отримуємо поточне значення параметра "vt"
   const viewType = (searchParams.get("vt") as ViewTypeValue) || defaultViewType

   // Допоміжні змінні для перевірки типу відображення
   const isGrid = viewType === "grid"
   const isList = viewType === "list"

   // Функція для оновлення параметра "vt"
   const setViewType = (value: ViewTypeValue) => {
      const newSearchParams = new URLSearchParams(searchParams)

      if (value !== defaultViewType) {
         newSearchParams.set("vt", value)
      } else {
         newSearchParams.delete("vt")
      }

      // Оновлюємо URL без перезавантаження сторінки
      setSearchParams(newSearchParams, { replace: true })
   }

   return { viewType, setViewType, isGrid, isList }
}
