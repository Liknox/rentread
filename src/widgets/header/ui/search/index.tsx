import { useRouter } from "@tanstack/react-router"
import { AutoComplete, Input } from "antd"
import { BookRow } from "entities/book"
import { useState } from "react"
import type { AbstractBook } from "shared/api"
import { fakeApi } from "shared/api"
import { useSearchParam } from "widgets/header/params"

// const initialQuery = fakeApi.library.books.getAll();
const initialQuery: AbstractBook[] = []

// !!! FIXME
const CATALOG_ROUTE = "/catalog"

const mapToOptions = (books: AbstractBook[]) =>
   books.map(book => ({
      value: String(book.id),
      label: <BookRow data={book} size="small" titleAsLink={false} />,
   }))

const TOOLTIP = {
   MIN_LENGTH: "Clarify the request (minimum 3 characters)",
   NOT_FOUND: "Nothing found - try an advanced search.",
}

const useSearch = () => {
   const [query, setQuery] = useState<AbstractBook[]>(initialQuery)
   // FIXME
   const [indexReset, updateReset] = useState(0)
   const [tooltip, setTooltip] = useState(TOOLTIP.MIN_LENGTH)
   const params = useSearchParam()
   const router = useRouter()

   // FIXME: Reset input, if not catalog's page
   const isCatalogPage = location.pathname === CATALOG_ROUTE

   const handleAutocomplete = (search: string) => {
      const isNotEnoughLength = search.length < 3
      setTooltip(isNotEnoughLength ? TOOLTIP.MIN_LENGTH : TOOLTIP.NOT_FOUND)
      // FIXME: hardcoded
      if (isNotEnoughLength) return setQuery(initialQuery)

      const booksQuery = fakeApi.library.books.getList({ filters: { search } })
      setQuery(booksQuery)
   }

   const handleSelect = (value: string) => {
      // FIXME: added manually
      setQuery([])
      // FIXME: hardcoded
      router.navigate({ to: `/book/${value}` })
      updateReset((indexReset + 1) % 10)
   }

   const handleSubmit = (search: string) => {
      if (isCatalogPage) {
         return params.setSearch(search)
      }

      // FIXME: hardcoded
      router.navigate({ to: CATALOG_ROUTE, search: { q: String(search) } })
   }

   return {
      query,
      tooltip,
      handleAutocomplete,
      handleSelect,
      handleSubmit,
      indexReset,
      param: params.search,
   }
}

const HeaderSearch = () => {
   const search = useSearch()

   return (
      <AutoComplete
         // For clearing input
         key={search.indexReset}
         defaultValue={search.param}
         // FIXME: refine later
         options={mapToOptions(search.query)}
         // FIXME: refine later
         className="w-full items-center"
         onSelect={search.handleSelect}
         onSearch={search.handleAutocomplete}
         notFoundContent={search.tooltip}>
         <Input.Search size="large" placeholder="Search books" enterButton onSearch={search.handleSubmit} allowClear />
      </AutoComplete>
   )
}

export default HeaderSearch
