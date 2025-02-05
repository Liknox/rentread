import { useRouter, useSearch } from "@tanstack/react-router"

interface SearchParams {
   authors?: string | number
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
