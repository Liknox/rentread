import { useRouter } from "@tanstack/react-router"
import { AutoComplete, Input } from "antd"
import { useState } from "react"
import { useTranslation } from "react-i18next"

import { ROUTES } from "@app/configs/constants"
import { TRANSLATIONS } from "@app/configs/constants/translation"
import { useBreakpoint, useMobileDetection } from "@shared/lib/browser"
import { useSearchParam } from "@shared/lib/url-params"
import { BookRow } from "entities/book"
import type { AbstractBook } from "@shared/api"
import { fakeApi } from "@shared/api"

// const initialQuery = fakeApi.library.books.getAll();
const initialQuery: AbstractBook[] = []

const mapToOptions = (books: AbstractBook[]) =>
   books.map(book => ({
      value: String(book.id),
      label: <BookRow data={book} size="small" titleAsLink={false} searchBar />,
   }))

const TOOLTIP = {
   MIN_LENGTH: TRANSLATIONS.header.placeholders.minLength,
   NOT_FOUND: TRANSLATIONS.header.placeholders.notFound,
}

const useSearch = () => {
   const [query, setQuery] = useState<AbstractBook[]>(initialQuery)
   const { t } = useTranslation()
   const [indexReset, updateReset] = useState(0)
   const [tooltip, setTooltip] = useState(t(TOOLTIP.MIN_LENGTH))
   const params = useSearchParam()
   const router = useRouter()

   // FIXME: Reset input, if not catalog's page
   const isCatalogPage = location.pathname === ROUTES.CATALOG

   const handleAutocomplete = (search: string) => {
      // FIXME: set max line (value is too big)
      const isNotEnoughLength = search.length < 3
      setTooltip(t(isNotEnoughLength ? TOOLTIP.MIN_LENGTH : TOOLTIP.NOT_FOUND))
      // FIXME: hardcoded
      if (isNotEnoughLength) return setQuery(initialQuery)

      const booksQuery = fakeApi.library.books.getList({ filters: { search } })
      setQuery(booksQuery)
   }

   const handleSelect = (value: string) => {
      // FIXME: added manually
      setQuery([])
      const route = `${ROUTES.BOOK}/${value}`
      router.navigate({ to: route })
      updateReset((indexReset + 1) % 10)
   }

   const getSearchRoute = (search: string) => ({
      to: ROUTES.CATALOG,
      search: { q: String(search) },
   })

   const handleSubmit = (search: string) => {
      if (isCatalogPage) {
         return params.setSearch(search)
      }

      router.navigate(getSearchRoute(search))
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
   const { t } = useTranslation()
   const search = useSearch()
   const isMobile = useMobileDetection()
   const breakpoint = useBreakpoint()

   return (
      <AutoComplete
         // For clearing input
         key={search.indexReset}
         defaultValue={search.param}
         options={mapToOptions(search.query)}
         className="w-full items-center"
         onSelect={search.handleSelect}
         onSearch={search.handleAutocomplete}
         notFoundContent={search.tooltip}
         popupMatchSelectWidth={!isMobile}
         aria-label="search books">
         <Input.Search
            size={breakpoint.xs ? "middle" : "large"}
            placeholder={t(TRANSLATIONS.header.placeholders.searchPlaceholder)}
            enterButton={!breakpoint.xs}
            onSearch={search.handleSubmit}
            allowClear
            className="rounded-md"
         />
      </AutoComplete>
   )
}

export default HeaderSearch
