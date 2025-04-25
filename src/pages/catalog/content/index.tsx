import { AppstoreOutlined, BarsOutlined } from "@ant-design/icons"
import { useMobileDetection } from "@shared/lib/browser"
import { Badge, Col, Empty, Layout, Radio, Row, Typography } from "antd"
import { Button, Drawer, Pagination, Select } from "antd"
import cn from "classnames"
import { useState } from "react"
import { useTranslation } from "react-i18next"

import { BOOKS_PER_PAGE, SORTINGS } from "@app/configs/constants"
import { TRANSLATIONS } from "@app/configs/constants/translation"
import { type AbstractBook, fakeApi } from "@shared/api"
import { scrollToTop } from "@shared/lib/dom"
import ScrollToTopButton from "@shared/ui/scroll-to-top"
import { BookCard, BookRowCard } from "entities/book"
import { orderLib } from "entities/order"
import { TariffRadio } from "entities/tariff"
import { Cart } from "features/cart"
import { Fav } from "features/fav"
import { Reserve } from "features/reserve"
import { headerParams } from "widgets/header"
import * as catalogParams from "../params"
import Sidebar from "../sidebar"

const { Option } = Select

const viewTypes = [
   { key: "grid", Icon: AppstoreOutlined },
   { key: "list", Icon: BarsOutlined },
]

const ribbonPropsTypes = {
   RESERVABLE: {
      text: TRANSLATIONS.catalog.ribbon.notAvailable,
      color: "gray",
      isVisible: true,
   },
   OUT_STOCK: {
      text: TRANSLATIONS.catalog.ribbon.popular,
      color: "magenta",
      isVisible: true,
   },
   RENTABLE: {
      text: "",
      color: "",
      isVisible: false,
   },
}

const useFilters = () => {
   const params = headerParams.useSearchParam()
   const { authors } = catalogParams.useFilterByAuthor()
   const { publishers } = catalogParams.useFilterByPublisher()
   const { categories } = catalogParams.useFilterByCategory()
   const prices = catalogParams.usePrices()
   const { tariff } = catalogParams.useTariff()
   const { existsOnly } = catalogParams.useExistsOnly()

   return {
      authors,
      publishers,
      categories,
      prices,
      search: params.search,
      tariff,
      existsOnly,
      // !!! FIXME: simplify!!!
      getRentInfoBy: (b: AbstractBook) => orderLib.getRentInfo(b.id),
      // exclude: viewerABooksIds,
      // exclude: [],
   }
}

function CatalogContent() {
   const { t } = useTranslation()
   const filters = useFilters()
   const obParam = catalogParams.useSorting()
   const isMobile = useMobileDetection()

   const booksQuery = fakeApi.library.books.getList({ filters, orderby: obParam.sorting })
   const vtParam = catalogParams.useViewType()

   const pagination = catalogParams.usePagination()
   const [pageSize, setPageSize] = useState(BOOKS_PER_PAGE)
   const [open, setOpen] = useState(false)

   const handlePageChange = (page: number, size: number) => {
      scrollToTop()
      pagination.setPage(page)
      setPageSize(size)
   }

   const paginatedData = isMobile
      ? booksQuery
      : booksQuery.slice((pagination.page - 1) * pageSize, pagination.page * pageSize)

   return (
      <>
         <Layout aria-label="catalog layout">
            <section className="flex md:mr-10 mb-2 text-xl" aria-label="sort filter options">
               <SortFilterOptions setOpen={setOpen} />
               {isMobile || (
                  <Radio.Group
                     value={vtParam.viewType}
                     onChange={e => {
                        console.debug("[DEBUG] reachGoal: CHANGE_CATALOG_VIEW_TYPE")
                        vtParam.setViewType(e.target.value)
                     }}
                     buttonStyle="solid"
                     aria-label="view type">
                     {viewTypes.map(vt => (
                        <Radio.Button
                           key={vt.key}
                           value={vt.key}
                           className="h-[30px] text-lightGray"
                           aria-label={vt.key === "grid" ? "grid template" : "list template"}>
                           <vt.Icon className="text-[20px] pt-1" />
                        </Radio.Button>
                     ))}
                  </Radio.Group>
               )}
            </section>
            <section className="mr-0 md:mr-10" aria-label="books section">
               <Row justify="start" className="!gap-1 md:!gap-0" gutter={[20, 20]} aria-label="books row">
                  {paginatedData.map(b => (
                     <BookItem key={b.id} data={b} />
                  ))}
               </Row>
               {!booksQuery.length && (
                  <Empty
                     className="my-[100px]"
                     description={t(TRANSLATIONS.catalog.foundNothing)}
                     aria-label="empty catalog"
                  />
               )}
               {isMobile || (
                  <Pagination
                     className="mt-10 mb-5 text-center"
                     current={pagination.page}
                     pageSize={pageSize}
                     total={booksQuery.length}
                     onChange={handlePageChange}
                     onShowSizeChange={handlePageChange}
                     align="center"
                     responsive
                     aria-label="pagination"
                  />
               )}
            </section>
         </Layout>
         <Drawer
            id="left-drawer"
            closable={true}
            placement={isMobile ? "bottom" : "left"}
            onClose={() => setOpen(prev => !prev)}
            open={open}
            height={isMobile ? "90%" : undefined}
            title={t(TRANSLATIONS.catalog.filters.title)}
            aria-label="filters drawer">
            <Sidebar />
         </Drawer>
      </>
   )
}

const BookItem = ({ data }: { data: AbstractBook }) => {
   const { t } = useTranslation()
   const vtParam = catalogParams.useViewType()
   const rent = orderLib.getRentInfo(data.id)
   const ribbon = ribbonPropsTypes[rent.status]
   const span = vtParam.isGrid ? 8 : 24
   const isMobile = useMobileDetection()

   return (
      <Col span={span} className="mt-4 md:mt-0 !p-0 md:!p-2" aria-label="book column">
         <Badge.Ribbon
            text={t(ribbon.text)}
            color={ribbon.color}
            style={ribbon.isVisible ? undefined : { display: "none" }}
            aria-label="ribbon">
            {vtParam.isGrid && (
               <BookCard
                  data={data}
                  asSecondary={rent.status === "RESERVABLE"}
                  actions={[
                     <Fav.Actions.AddBookMini key="fav" bookId={data.id} aria-label="add to favorites" />,
                     rent.status === "RENTABLE" && (
                        <Cart.Actions.AddBookMini key="order" bookId={data.id} aria-label="add to cart" />
                     ),
                     rent.status === "RESERVABLE" && (
                        <Reserve.Actions.ReserveBookMini key="reserve" bookId={data.id} aria-label="reserve" />
                     ),
                  ].filter(Boolean)}>
                  <br />
                  <Typography.Text type="secondary">
                     {rent.status === "RENTABLE" && (
                        <span>
                           {t(TRANSLATIONS.timezone.forRent)} {Math.min(30, rent.duration)}{" "}
                           {t(TRANSLATIONS.timezone.dayss)}
                        </span>
                     )}
                  </Typography.Text>
               </BookCard>
            )}
            {vtParam.isList && (
               <BookRowCard
                  data={data}
                  asSecondary={rent.status === "RESERVABLE"}
                  size={isMobile ? "default" : "large"}
                  actions={
                     <>
                        <Fav.Actions.AddBook bookId={data.id} aria-label="add to favorites" />
                        {rent.status === "RENTABLE" && (
                           <Cart.Actions.AddBook bookId={data.id} aria-label="add to cart" />
                        )}
                        {rent.status === "RESERVABLE" && (
                           <Reserve.Actions.ReserveBook bookId={data.id} aria-label="reserve" />
                        )}
                        {rent.status !== "RESERVABLE" && !isMobile ? (
                           <TariffRadio __byDuration={rent.duration} disabled aria-label="tariff radio" />
                        ) : null}
                     </>
                  }
               />
            )}
         </Badge.Ribbon>
      </Col>
   )
}

type Props = {
   setOpen: (e: boolean) => void
}

const SortFilterOptions = ({ setOpen }: Props) => {
   const { t } = useTranslation()
   const obParam = catalogParams.useSorting()
   const isMobile = useMobileDetection()

   return (
      <Row className={cn("grow", { "mr-5": !isMobile, "justify-between": isMobile })} aria-label="sort filter options">
         {isMobile ? (
            <Button onClick={() => setOpen(true)} aria-label="open filters">
               {t(TRANSLATIONS.catalog.filters.title)}
            </Button>
         ) : (
            <b className="mr-5 text-xl">{t(TRANSLATIONS.catalog.sortBy.title)}:</b>
         )}
         <Select
            placeholder={t(TRANSLATIONS.catalog.sortBy.options.novelty)}
            className="md:!w-[200px] w-[180px]"
            onChange={value => obParam.setSorting(value)}
            aria-label="sort select">
            {Object.entries(SORTINGS).map(([sId, sName]) => (
               <Option key={sId} value={Number(sId)}>
                  {t(sName)}
               </Option>
            ))}
         </Select>
      </Row>
   )
}

export default CatalogContent
