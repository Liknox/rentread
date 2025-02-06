import { useRouter, useSearch } from "@tanstack/react-router"
import { useRef } from "react"

interface SearchParams {
   authors?: string | number
   pub?: string | number
   cat?: string | number
   // @ts-expect-error this will cause an error
   existsOnly?: boolean | undefined
   tarrif?: string
   [key: string]: string | number | undefined
}

export const TARIFFS = {
   T7: 7,
   T14: 14,
   T30: 30,
}

// FIXME: move to entities / config / constants?
export const PRICES = {
   MIN: 50,
   MAX: 1000,
}

/** @query Filter: by author */
export const useFilterByAuthor = () => {
   const search = useSearch({ strict: false }) as SearchParams
   const router = useRouter()
   const authors =
      String(search.authors)
         ?.split("_")
         .map(item => (item ? Number(item) : null))
         .filter((item): item is number => item !== null) || []

   const setAuthors = (value: number[]) => {
      const newSearch: SearchParams = { ...search }

      if (value.length > 0) {
         newSearch.authors = value.length === 1 ? value[0] : value.join("_")
      } else {
         delete newSearch.authors
      }

      console.log(newSearch)

      router.navigate({ to: location.pathname, search: newSearch })
   }

   return { authors, setAuthors }
}

/** @query Filter: by publisher */
export const useFilterByPublisher = () => {
   const search = useSearch({ strict: false }) as SearchParams
   const router = useRouter()
   const publishers =
      String(search.pub)
         ?.split("_")
         .map(item => (item ? Number(item) : null))
         .filter((item): item is number => item !== null) || []

   const setPublishers = (value: number[]) => {
      const newSearch: SearchParams = { ...search }

      if (value.length > 0) {
         newSearch.pub = value.length === 1 ? value[0] : value.join("_")
      } else {
         delete newSearch.pub
      }

      console.log(newSearch)

      router.navigate({ to: location.pathname, search: newSearch })
   }

   return { publishers, setPublishers }
}

/** @query Filter: by category */
export const useFilterByCategory = () => {
   const search = useSearch({ strict: false }) as SearchParams
   const router = useRouter()
   const categories =
      String(search.cat)
         ?.split("_")
         .map(item => (item ? Number(item) : null))
         .filter((item): item is number => item !== null) || []

   const setCategories = (value: number[]) => {
      const newSearch: SearchParams = { ...search }

      if (value.length > 0) {
         newSearch.cat = value.length === 1 ? value[0] : value.join("_")
      } else {
         delete newSearch.cat
      }

      console.log(newSearch)

      router.navigate({ to: location.pathname, search: newSearch })
   }

   return { categories, setCategories }
}

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
         delete newSearch.existsOnly
      }

      router.navigate({ to: location.pathname, search: newSearch })
   }
   return { existsOnly, setExistsOnly }
}

export const useTariff = () => {
   const search = useSearch({ strict: false }) as SearchParams
   const router = useRouter()
   // FIXME: type
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
            delete newSearch.tariff
         }

         router.navigate({ to: location.pathname, search: newSearch })
      }, 300)
   }

   return { tariff, setTariff }
}
