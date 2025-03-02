import { routes } from "@app/configs/constants"
import { TRANSLATIONS } from "@app/configs/constants/translation"
import { isMobile } from "@shared/lib/browser"
import { useTitle } from "@shared/lib/dom"
import { Link } from "@tanstack/react-router"
import { Button, Col, Empty, Layout, Row, Typography } from "antd"
import cn from "classnames"
import { BookCard, BookRowCard } from "entities/book"
import { orderLib, orderModel } from "entities/order"
import { TariffRadio } from "entities/tariff"
import { Cart } from "features/cart"
import { Fav } from "features/fav"
import { useTranslation } from "react-i18next"

function Order() {
   const { t } = useTranslation()
   useTitle(t(TRANSLATIONS.pageTitle.cart))
   return (
      <Layout.Content>
         <Cart.Steps.View current={0} className="mb-10" />
         <Layout className={cn("flex", { "!flex-col": isMobile })}>
            <Content />
            <Sidebar />
         </Layout>
      </Layout.Content>
   )
}

const Content = () => {
   const { t } = useTranslation()
   const order = orderModel.cart.useOrder()
   const durations = orderModel.cart.useOrderDurations()

   return (
      <Layout className={cn({ "!w-full": isMobile })}>
         <Typography.Title level={2}>{t(TRANSLATIONS.order.cart.title)}</Typography.Title>
         <section>
            <Typography.Title level={3} type="secondary">
               {t(TRANSLATIONS.order.cart.subtitle)}
            </Typography.Title>
            <Typography.Text className="block mb-5" type="secondary">
               {t(TRANSLATIONS.order.cart.description)}
            </Typography.Text>
            <Row gutter={[0, 20]}>
               {order.books.map(book => {
                  const rent = orderLib.getRentInfo(book.id)
                  return (
                     <Col key={book.id} span={24}>
                        <BookRowCard
                           data={book}
                           size={isMobile ? "default" : "large"}
                           cartBar
                           actions={
                              <div
                                 className={cn({
                                    "flex flex-row gap-2": isMobile,
                                    "flex-col gap-4": window.innerWidth < 380,
                                 })}>
                                 <Cart.Actions.DeleteBook bookId={book.id} />
                                 <TariffRadio
                                    onChange={value =>
                                       orderModel.cart.events.setBookDuration({
                                          bookId: book.id,
                                          duration: value,
                                       })
                                    }
                                    __byDuration={rent.duration}
                                    value={durations[book.id] || 7}
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
                  className="py-40 text-center text-lightslategray bg-[var(--color-accent)] rounded-[25px]"
                  description={t(TRANSLATIONS.order.cart.empty)}
               />
            )}
         </section>
         {isMobile || (
            <section className="my-14">
               <RecommendationsSection />
            </section>
         )}
      </Layout>
   )
}

const RecommendationsSection = () => {
   const { t } = useTranslation()
   const recommended = orderModel.cart.useRecommended()

   if (!recommended.books) return null

   return (
      <>
         <Typography.Title level={3} type="secondary">
            {t(TRANSLATIONS.order.cart.commTitle)}
         </Typography.Title>
         <Typography.Text className="block mb-5" type="secondary">
            {t(TRANSLATIONS.order.cart.commDescr)}
         </Typography.Text>
         <Row className="overflow-auto pb-5" wrap={false} gutter={[20, 0]}>
            {recommended.books
               .filter(b => orderLib.getRentInfo(b.id).status === "RENTABLE")
               .map(b => (
                  <Col key={b.id} span={8} className="min-w-full md:min-w-[315px]">
                     <BookCard
                        data={b}
                        size="small"
                        className="m-0"
                        // TODO: Add a check for `rent` and return?
                        actions={[
                           <Fav.Actions.AddBookMini key="fav" bookId={b.id} />,
                           <Cart.Actions.AddBookMini key="order" bookId={b.id} />,
                        ]}
                        withDescription
                     />
                  </Col>
               ))}
         </Row>
      </>
   )
}

const Sidebar = () => {
   const { t } = useTranslation()
   const { isEmptyCart } = orderModel.cart.useOrderValidation()

   return (
      <Layout.Sider width={isMobile ? "100%" : 400} className="mt-8 md:mt-0">
         <Cart.TotalInfo.Card>
            <Link to={routes.CHECKOUT}>
               {isEmptyCart ? (
                  <Button block type="default" style={{ height: 50 }} disabled>
                     {t(TRANSLATIONS.order.sidebar.proceed)}
                  </Button>
               ) : (
                  <Button block type="primary" style={{ height: 50 }}>
                     {t(TRANSLATIONS.order.sidebar.proceed)}
                  </Button>
               )}
            </Link>
         </Cart.TotalInfo.Card>
         {isMobile && (
            <section className="my-14">
               <RecommendationsSection />
            </section>
         )}
      </Layout.Sider>
   )
}

export default Order
