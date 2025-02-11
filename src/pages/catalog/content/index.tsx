import { AppstoreOutlined, BarsOutlined } from "@ant-design/icons"
import { type AbstractBook, fakeApi } from "@shared/api"
import { Badge, Col, Empty, Layout, Radio, Row } from "antd"
import { BookCard, BookRowCard } from "entities/book"
import { orderLib } from "entities/order"
import { headerParams } from "widgets/header"
import * as catalogParams from "../params"

import { TariffRadio } from "entities/tariff"
import { Cart } from "features/cart"
import { Fav } from "features/fav"
import { Reserve } from "features/reserve"

const viewTypes = [
   { key: "grid", Icon: AppstoreOutlined },
   { key: "list", Icon: BarsOutlined },
]

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
   const filters = useFilters()
   const obParam = catalogParams.useSorting()

   const booksQuery = fakeApi.library.books.getList({ filters, orderby: obParam.sorting })
   const vtParam = catalogParams.useViewType()

   return (
      <Layout>
         <section className="flex mr-10 mb-2 text-xl">
            <Radio.Group
               value={vtParam.viewType}
               onChange={e => {
                  // eslint-disable-next-line no-console
                  console.debug("[DEBUG] reachGoal: CHANGE_CATALOG_VIEWTYPE")
                  vtParam.setViewType(e.target.value)
               }}
               buttonStyle="solid">
               {viewTypes.map(vt => (
                  <Radio.Button key={vt.key} value={vt.key} className="h-[30px] text-lightGray">
                     <vt.Icon style={{ fontSize: 20 }} />
                  </Radio.Button>
               ))}
            </Radio.Group>
         </section>
         <section className="mr-10">
            <Row justify="start" gutter={[20, 20]}>
               {booksQuery.map(b => (
                  <BookItem key={b.id} data={b} />
               ))}
            </Row>
            {!booksQuery.length && (
               <Empty className="my-[100px]" description="Couldn't find anything matching your request." />
            )}
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
      <Col span={span}>
         <Badge.Ribbon
            text={ribbon.text}
            color={ribbon.color}
            style={ribbon.isVisible ? undefined : { display: "none" }}>
            {vtParam.isGrid && <BookCard data={data} />}
            {vtParam.isList && (
               <BookRowCard
                  data={data}
                  asSecondary={rent.status === "RESERVABLE"}
                  size="large"
                  actions={
                     <>
                        <Fav.Actions.AddBook bookId={data.id} />
                        {rent.status === "RENTABLE" && <Cart.Actions.AddBook bookId={data.id} />}
                        {rent.status === "RESERVABLE" && <Reserve.Actions.ReserveBook bookId={data.id} />}
                        {rent.status !== "RESERVABLE" && <TariffRadio __byDuration={rent.duration} />}
                     </>
                  }
               />
            )}
         </Badge.Ribbon>
      </Col>
   )
}

export default CatalogContent
