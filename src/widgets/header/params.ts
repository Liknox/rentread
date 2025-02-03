import { useSearch } from "@tanstack/react-router"

/** @query Search query */
export const useSearchParam = () => {
   const search = useSearch({ strict: false }) as Record<string, string>
   const searchValue = search.q || ""

   const setSearch = (nextValue: string | undefined) => {
      const newParams = new URLSearchParams(window.location.search)

      if (nextValue) {
         newParams.set("q", nextValue)
      } else {
         newParams.delete("q")
      }
      window.history.replaceState(null, "", `?${newParams}`)
   }

   return { search: searchValue, setSearch }
}
