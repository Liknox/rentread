import { useRouter, useSearch } from "@tanstack/react-router"
import { useRef } from "react"

import { DEFAULT_SORTING, PRICES, TARIFFS, TIMEOUT } from "@app/configs/constants"
import { useMobileDetection } from "@shared/lib/browser"

interface SearchParams {
   authors?: string | number
   pub?: string | number
   cat?: string | number
   // @ts-expect-error this will cause an error
   existsOnly?: boolean | undefined
   tarrif?: string
   from?: string
   to?: string
   sorting?: string
   [key: string]: string | number | undefined
}

/** @query Filter: by author */
export const useFilterByAuthor = () => {
   const search = useSearch({ strict: false }) as SearchParams
   const router = useRouter()
   const authors = search.authors
      ? String(search.authors)
           ?.split("_")
           .map(item => (item ? Number(item) : null))
           .filter((item): item is number => item !== null) || []
      : []

   const setAuthors = (value: number[]) => {
      const newSearch: SearchParams = { ...search }

      if (value.length > 0) {
         newSearch.authors = value.length === 1 ? value[0] : value.join("_")
      } else {
         newSearch.authors = undefined
      }

      router.navigate({ to: location.pathname, search: newSearch })
   }

   return { authors, setAuthors }
}

/** @query Filter: by publisher */
export const useFilterByPublisher = () => {
   const search = useSearch({ strict: false }) as SearchParams
   const router = useRouter()
   const publishers = search.pub
      ? String(search.pub)
           ?.split("_")
           .map(item => (item ? Number(item) : null))
           .filter((item): item is number => item !== null) || []
      : []

   const setPublishers = (value: number[]) => {
      const newSearch: SearchParams = { ...search }

      if (value.length > 0) {
         newSearch.pub = value.length === 1 ? value[0] : value.join("_")
      } else {
         newSearch.pub = undefined
      }

      router.navigate({ to: location.pathname, search: newSearch })
   }

   return { publishers, setPublishers }
}

/** @query Filter: by category */
export const useFilterByCategory = () => {
   const search = useSearch({ strict: false }) as SearchParams
   const router = useRouter()
   const categories = search.cat
      ? String(search.cat)
           ?.split("_")
           .map(item => (item ? Number(item) : null))
           .filter((item): item is number => item !== null) || []
      : []

   const setCategories = (value: number[]) => {
      const newSearch: SearchParams = { ...search }

      if (value.length > 0) {
         newSearch.cat = value.length === 1 ? value[0] : value.join("_")
      } else {
         newSearch.cat = undefined
      }

      router.navigate({ to: location.pathname, search: newSearch })
   }

   return { categories, setCategories }
}

/** @query Filter: by existence */
export const useExistsOnly = () => {
   const search = useSearch({ strict: false }) as SearchParams
   const router = useRouter()

   const DEFAULT_EXISTS_ONLY = false
   const existsOnly = Boolean(search.existsOnly) || DEFAULT_EXISTS_ONLY

   const setExistsOnly = (value: boolean) => {
      const newSearch: SearchParams = { ...search }

      if (value) {
         newSearch.existsOnly = true
      } else {
         newSearch.existsOnly = undefined
      }

      router.navigate({ to: location.pathname, search: newSearch })
   }
   return { existsOnly, setExistsOnly }
}

/** @query Filter: by terms of rent */
export const useTariff = () => {
   const search = useSearch({ strict: false }) as SearchParams
   const router = useRouter()
   const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
   const tariff = Number(search.tariff) || TARIFFS.T7

   // Debounce update
   const setTariff = (tariff: number) => {
      if (timerRef.current) {
         clearTimeout(timerRef.current)
      }
      timerRef.current = setTimeout(() => {
         const newSearch: SearchParams = { ...search }

         if (tariff !== TARIFFS.T7) {
            newSearch.tariff = tariff
         } else {
            newSearch.tariff = undefined
         }

         router.navigate({ to: location.pathname, search: newSearch })
      }, TIMEOUT.PARAM_DEBOUNCE)
   }

   return { tariff, setTariff }
}

/** @query Filter: by prices */
export const usePrices = () => {
   const search = useSearch({ strict: false }) as SearchParams
   const router = useRouter()

   const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

   const from = Number(search.pf) || PRICES.MIN
   const to = Number(search.pt) || PRICES.MAX

   // Debounce update
   const setPrice = (from: number, to: number) => {
      if (timerRef.current) {
         clearTimeout(timerRef.current)
      }
      timerRef.current = setTimeout(() => {
         const newSearch: SearchParams = { ...search }

         if (from !== PRICES.MIN || to !== PRICES.MAX) {
            newSearch.pf = from
            newSearch.pt = to
         } else {
            newSearch.pf = undefined
            newSearch.pt = undefined
         }

         router.navigate({ to: location.pathname, search: newSearch })
      }, TIMEOUT.PARAM_DEBOUNCE)
   }

   return { from, to, setPrice }
}

/** @query Sort: by sorting type */
export const useSorting = () => {
   const search = useSearch({ strict: false }) as SearchParams
   const router = useRouter()

   const sorting = Number(search.sort) || DEFAULT_SORTING

   const setSorting = (value: number) => {
      const newSearch: SearchParams = { ...search }

      if (value !== DEFAULT_SORTING) {
         newSearch.sort = value
      } else {
         newSearch.sort = undefined
      }

      router.navigate({ to: location.pathname, search: newSearch })
   }

   return { sorting, setSorting }
}

export const VIEW_TYPE = {
   grid: "grid" as const,
   list: "list" as const,
}

type ViewTypeValue = (typeof VIEW_TYPE)[keyof typeof VIEW_TYPE]

export const defaultViewType = VIEW_TYPE.list

/** @query Display: by view type */
export const useViewType = () => {
   const search = useSearch({ strict: false }) as SearchParams
   const router = useRouter()
   const isMobile = useMobileDetection()
   const viewType = search.vt || defaultViewType

   const isGrid = isMobile ? false : viewType === "grid"
   const isList = isMobile ? true : viewType === "list"

   const setViewType = (value: ViewTypeValue) => {
      const newSearch: SearchParams = { ...search }

      if (value !== defaultViewType) {
         newSearch.vt = value
      } else {
         newSearch.vt = undefined
      }

      router.navigate({ to: location.pathname, search: newSearch })
   }

   return { viewType: viewType as ViewTypeValue, setViewType, isGrid, isList }
}

/** @query Pagination: by page */
export const usePagination = () => {
   const search = useSearch({ strict: false }) as SearchParams
   const router = useRouter()

   const page = Number(search.page) || 1

   const setPage = (value: number) => {
      const newSearch: SearchParams = { ...search }

      if (value > 1) {
         newSearch.page = value
      } else {
         newSearch.page = undefined
      }

      router.navigate({ to: location.pathname, search: newSearch })
   }

   return { page, setPage }
}
