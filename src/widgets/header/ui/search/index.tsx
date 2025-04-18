import { useRouter } from "@tanstack/react-router"
import { AutoComplete, Input } from "antd"
import { useState } from "react"
import { useTranslation } from "react-i18next"

import { routes } from "@app/configs/constants"
import { TRANSLATIONS } from "@app/configs/constants/translation"
import { BookRow } from "entities/book"
import type { AbstractBook } from "shared/api"
import { fakeApi } from "shared/api"
import { useSearchParam } from "widgets/header/params"

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
   // FIXME
   const { t } = useTranslation()
   const [indexReset, updateReset] = useState(0)
   const [tooltip, setTooltip] = useState(t(TOOLTIP.MIN_LENGTH))
   const params = useSearchParam()
   const router = useRouter()

   // FIXME: Reset input, if not catalog's page
   const isCatalogPage = location.pathname === routes.CATALOG

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
      const route = `${routes.BOOK}/${value}`
      router.navigate({ to: route })
      updateReset((indexReset + 1) % 10)
   }

   const getSearchRoute = (search: string) => ({
      to: routes.CATALOG,
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
         <Input.Search
            size="large"
            placeholder={t(TRANSLATIONS.header.placeholders.searchPlaceholder)}
            enterButton
            onSearch={search.handleSubmit}
            allowClear
         />
      </AutoComplete>
   )
}

export default HeaderSearch
