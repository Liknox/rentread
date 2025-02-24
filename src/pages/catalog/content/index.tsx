import { AppstoreOutlined, BarsOutlined } from "@ant-design/icons"
import { type AbstractBook, fakeApi } from "@shared/api"
import { Pagination } from "antd"
import { Badge, Col, Empty, Layout, Radio, Row, Typography } from "antd"
import { BookCard, BookRowCard } from "entities/book"
import { orderLib } from "entities/order"
import { headerParams } from "widgets/header"
import * as catalogParams from "../params"

import cn from "classnames"

import { TariffRadio } from "entities/tariff"
import { Cart } from "features/cart"
import { Fav } from "features/fav"
import { Reserve } from "features/reserve"
import { useState } from "react"
import { isMobile } from "@shared/lib/browser"

const { SORTINGS } = catalogParams

const viewTypes = [
   { key: "grid", Icon: AppstoreOutlined },
   { key: "list", Icon: BarsOutlined },
]

// FIXME: extract to constants
const ribbonPropsTypes = {
   RESERVABLE: {
      text: "Not Available",
      color: "gray",
      isVisible: true,
   },
   OUT_STOCK: {
      text: "Popular",
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
   // FIXME: add skeleton template
   const filters = useFilters()
   const obParam = catalogParams.useSorting()

   const booksQuery = fakeApi.library.books.getList({ filters, orderby: obParam.sorting })
   const vtParam = catalogParams.useViewType()

   const [currentPage, setCurrentPage] = useState(1)
   const [pageSize, setPageSize] = useState(6)

   const handlePageChange = (page: number, size: number) => {
      setCurrentPage(page)
      setPageSize(size)
   }

   const paginatedData = booksQuery.slice((currentPage - 1) * pageSize, currentPage * pageSize)

   return (
      <Layout>
         <section className="flex mr-10 mb-2 text-xl">
            <Row className="grow mr-5">
               <b className="mr-5 text-xl">Sort by:</b>
               <ul className="flex grow justify-start gap-3 items-center">
                  {Object.entries(SORTINGS).map(([sId, sName]) => (
                     <li
                        key={sId}
                        className={cn("select-none transition-all duration-250 cursor-pointer", {
                           "text-primary": obParam.sorting === Number(sId),
                        })}
                        onClick={() => obParam.setSorting(Number(sId))}>
                        {sName}
                     </li>
                  ))}
               </ul>
            </Row>
            {isMobile || (
               <Radio.Group
                  value={vtParam.viewType}
                  onChange={e => {
                     console.debug("[DEBUG] reachGoal: CHANGE_CATALOG_VIEW_TYPE")
                     vtParam.setViewType(e.target.value)
                  }}
                  buttonStyle="solid">
                  {viewTypes.map(vt => (
                     <Radio.Button key={vt.key} value={vt.key} className="h-[30px] text-lightGray">
                        <vt.Icon className="text-[20px] pt-1" />
                     </Radio.Button>
                  ))}
               </Radio.Group>
            )}
         </section>
         <section className="mr-0 md:mr-10">
            <Row justify="start" className="!gap-1 md:!gap-0" gutter={[20, 20]}>
               {paginatedData.map(b => (
                  <BookItem key={b.id} data={b} />
               ))}
            </Row>
            {!booksQuery.length && (
               <Empty className="my-[100px]" description="Couldn't find anything matching your request." />
            )}
            <Pagination
               className="mt-8"
               current={currentPage}
               pageSize={pageSize}
               total={booksQuery.length}
               onChange={handlePageChange}
               onShowSizeChange={handlePageChange}
               align="center"
            />
         </section>
      </Layout>
   )
}

const BookItem = ({ data }: { data: AbstractBook }) => {
   const vtParam = catalogParams.useViewType()
   const rent = orderLib.getRentInfo(data.id)
   // const viewerNrml = viewerModel.useViewerNormalized();
   // const hasUserBook = viewerABooksIds.includes(data.id);
   // if (rent.status === "OUT_STOCK") return null;

   const ribbon = ribbonPropsTypes[rent.status]
   const span = vtParam.isGrid ? 8 : 24

   return (
      <Col span={span} className="mt-4 !p-0 md:!p-2">
         <Badge.Ribbon
            text={ribbon.text}
            color={ribbon.color}
            style={ribbon.isVisible ? undefined : { display: "none" }}>
            {vtParam.isGrid && (
               <BookCard
                  data={data}
                  asSecondary={rent.status === "RESERVABLE"}
                  actions={[
                     <Fav.Actions.AddBookMini key="fav" bookId={data.id} />,
                     rent.status === "RENTABLE" && <Cart.Actions.AddBookMini key="order" bookId={data.id} />,
                     rent.status === "RESERVABLE" && <Reserve.Actions.ReserveBookMini key="reserve" bookId={data.id} />,
                  ].filter(Boolean)}>
                  <br />
                  <Typography.Text type="secondary">
                     {rent.status === "RENTABLE" && <span>For rent up to {Math.min(30, rent.duration)} days</span>}
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
                        <Fav.Actions.AddBook bookId={data.id} />
                        {rent.status === "RENTABLE" && <Cart.Actions.AddBook bookId={data.id} />}
                        {rent.status === "RESERVABLE" && <Reserve.Actions.ReserveBook bookId={data.id} />}
                        {rent.status !== "RESERVABLE" && !isMobile ? (
                           <TariffRadio __byDuration={rent.duration} disabled />
                        ) : null}
                     </>
                  }
               />
            )}
         </Badge.Ribbon>
      </Col>
   )
}

export default CatalogContent
