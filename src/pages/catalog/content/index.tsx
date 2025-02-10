import { type AbstractBook, fakeApi } from "@shared/api"
import { Badge, Col, Empty, Layout, Row } from "antd"
import { BookRowCard } from "entities/book"
import { orderLib } from "entities/order"
import { headerParams } from "widgets/header"
import * as catalogParams from "../params"

import { Fav } from "features/fav"
import { Cart } from "features/cart"
import { Reserve } from "features/reserve"

const ribbonPropsTypes = {
   RESERVABLE: {
      text: "Can be reserved",
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

   return (
      <Layout>
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
   // const vtParam = catalogParams.useViewType()
   // const rent = orderLib.getRentInfo(data.id)
   const rent = { status: "RENTABLE" }
   // const viewerNrml = viewerModel.useViewerNormalized();
   // const hasUserBook = viewerABooksIds.includes(data.id);
   // if (rent.status === "OUT_STOCK") return null;

   // FIXME: type
   // @ts-expect-error this will cause an error
   const ribbon = ribbonPropsTypes[rent.status]
   // const span = vtParam.isGrid ? 8 : 24
   const span = 24

   return (
      <Col span={span}>
         <Badge.Ribbon
            text={ribbon.text}
            color={ribbon.color}
            style={ribbon.isVisible ? undefined : { display: "none" }}>
            <BookRowCard
               data={data}
               asSecondary={rent.status === "RESERVABLE"}
               size="large"
               actions={
                  <>
                     <Fav.Actions.AddBook bookId={data.id} />
                     {rent.status === "RENTABLE" && <Cart.Actions.AddBook bookId={data.id} />}
                     {rent.status === "RESERVABLE" && <Reserve.Actions.ReserveBook bookId={data.id} />}
                     {/* <TariffRadio __byDuration={rent.duration} /> */}
                  </>
               }
            />
         </Badge.Ribbon>
      </Col>
   )
}

export default CatalogContent
