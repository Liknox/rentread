import { useRouter, useSearch } from "@tanstack/react-router"

interface SearchParams {
   authors?: string | number
   pub?: string | number
   cat?: string | number
   [key: string]: string | number | undefined
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
