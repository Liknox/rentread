import { Link } from "@tanstack/react-router"
import { Button, Col, Empty, Layout, Row, Typography, Divider } from "antd"
import cn from "classnames"
import { useTranslation } from "react-i18next"

import { routes } from "@app/configs/constants"
import { TRANSLATIONS } from "@app/configs/constants/translation"
import { useMobileDetection, useBreakpoint } from "@shared/lib/browser"
import { useTitle } from "@shared/lib/dom"
import { BookCard, BookRowCard } from "entities/book"
import { orderLib, orderModel } from "entities/order"
import { TariffRadio } from "entities/tariff"
import { Cart } from "features/cart"
import { Fav } from "features/fav"

/**
 * @page Order Page
 */
function Order() {
   const { t } = useTranslation()
   const isMobile = useMobileDetection()
   useTitle(t(TRANSLATIONS.pageTitle.cart))
   return (
      <Layout.Content className="p-6 md:p-[40px_10%] mb-20 md:mb-0" aria-label="cart">
         <Cart.Steps.View current={0} className="mb-6 md:mb-10" aria-label="steps" />
         <Layout className={cn("flex", { "!flex-col": isMobile })} aria-label="layout">
            <Content />
            <Sidebar />
         </Layout>
      </Layout.Content>
   )
}

const Content = () => {
   const { t } = useTranslation()
   const isMobile = useMobileDetection()
   const breakpoint = useBreakpoint()
   const order = orderModel.useOrder()
   const durations = orderModel.useOrderDurations()
   const cartDurations = orderModel.useDurationsStore()

   return (
      <Layout className={cn("bg-transparent", { "!w-full": isMobile })} aria-label="cart main section">
         <Typography.Title level={breakpoint.xs ? 3 : 2} className="mb-4" aria-label="cart title">
            {t(TRANSLATIONS.order.cart.title)}
         </Typography.Title>
         <section aria-label="cart books section">
            <Typography.Title
               level={breakpoint.xs ? 4 : 3}
               type="secondary"
               className="mb-2"
               aria-label="cart subtitle">
               {t(TRANSLATIONS.order.cart.subtitle)}
            </Typography.Title>
            <Typography.Text className="block mb-5 text-sm md:text-base" type="secondary" aria-label="cart description">
               {t(TRANSLATIONS.order.cart.description)}
            </Typography.Text>
            <Row gutter={[0, 20]} aria-label="cart books row">
               {order.books.map(book => {
                  const rent = orderLib.getRentInfo(book.id)
                  return (
                     <Col key={book.id} span={24} className="mt-2" aria-label="cart book col">
                        <BookRowCard
                           data={book}
                           size={isMobile ? "default" : "large"}
                           cartBar
                           actions={
                              <div
                                 className={cn({
                                    "flex flex-row gap-2": isMobile,
                                    "flex-col": breakpoint.xl,
                                 })}
                                 aria-label="cart actions">
                                 <Cart.Actions.DeleteBook bookId={book.id} aria-label="delete book" />
                                 <TariffRadio
                                    onChange={value => {
                                       cartDurations.setBookDuration(book.id, value)
                                    }}
                                    __byDuration={rent.duration}
                                    value={durations[book.id] || 7}
                                    aria-label="cart tariff radio"
                                 />
                              </div>
                           }
                        />
                     </Col>
                  )
               })}
            </Row>
            {!order.books.length && (
               <Empty
                  className="py-32 md:py-40 text-center text-lightslategray bg-[var(--color-accent)] rounded-[25px]"
                  description={t(TRANSLATIONS.order.cart.empty)}
                  aria-label="cart empty"
               />
            )}
         </section>
         {!isMobile && (
            <section className="my-10 md:my-14" aria-label="cart recommendations section">
               <RecommendationsSection />
            </section>
         )}
      </Layout>
   )
}

const RecommendationsSection = () => {
   const { t } = useTranslation()
   const breakpoint = useBreakpoint()
   const recommended = orderModel.useRecommended()

   const parsedBooks = recommended.books.filter(b => orderLib.getRentInfo(b.id).status === "RENTABLE")

   if (!parsedBooks.length) return null

   return (
      <>
         <Divider className="my-6" aria-label="cart recommendations divider" />
         <Typography.Title
            level={breakpoint.xs ? 4 : 3}
            type="secondary"
            className="mb-2"
            aria-label="cart recommendations title">
            {t(TRANSLATIONS.order.cart.commTitle)}
         </Typography.Title>
         <Typography.Text
            className="block mb-5 text-sm md:text-base"
            type="secondary"
            aria-label="cart recommendations description">
            {t(TRANSLATIONS.order.cart.commDescr)}
         </Typography.Text>
         <Row className="overflow-auto pb-5" wrap={false} gutter={[20, 0]} aria-label="cart recommendations row">
            {recommended.books
               .filter(b => orderLib.getRentInfo(b.id).status === "RENTABLE")
               .map(b => (
                  <Col
                     key={b.id}
                     span={8}
                     className="min-w-full md:min-w-[315px]"
                     aria-label="cart recommendation book col">
                     <BookCard
                        data={b}
                        size="small"
                        className="m-0"
                        // TODO: Add a check for `rent` and return?
                        actions={[
                           <Fav.Actions.AddBookMini key="fav" bookId={b.id} aria-label="add to fav" />,
                           <Cart.Actions.AddBookMini key="order" bookId={b.id} aria-label="add to cart" />,
                        ]}
                        withDescription
                        aria-label="cart recommendation book card"
                     />
                  </Col>
               ))}
         </Row>
      </>
   )
}

const Sidebar = () => {
   const { t } = useTranslation()
   const isMobile = useMobileDetection()
   const { isEmptyCart } = orderModel.useOrderValidation()

   return (
      <Layout.Sider width={isMobile ? "100%" : 400} className="mt-8 md:mt-0" aria-label="cart sidebar">
         <Cart.TotalInfo.Card aria-label="cart total info card">
            <Link to={routes.CHECKOUT} aria-label="proceed to checkout">
               {isEmptyCart ? (
                  <Button block type="default" style={{ height: 50 }} disabled aria-label="proceed">
                     {t(TRANSLATIONS.order.sidebar.proceed)}
                  </Button>
               ) : (
                  <Button block type="primary" style={{ height: 50 }} aria-label="proceed">
                     {t(TRANSLATIONS.order.sidebar.proceed)}
                  </Button>
               )}
            </Link>
         </Cart.TotalInfo.Card>
         {isMobile && (
            <section className="my-10 md:my-14" aria-label="cart recommendations section">
               <RecommendationsSection />
            </section>
         )}
      </Layout.Sider>
   )
}

export default Order
