import { useSearchParams } from "react-router-dom"

/** @query Search query */
export const useSearchParam = () => {
   const [searchParams, setSearchParams] = useSearchParams()
   const searchValue = searchParams.get("q") || ""

   const setSearch = (nextValue: string | undefined) => {
      const newParams = new URLSearchParams(searchParams)

      if (nextValue) {
         newParams.set("q", nextValue)
      } else {
         newParams.delete("q")
      }

      setSearchParams(newParams)
   }

   return { search: searchValue, setSearch }
}
