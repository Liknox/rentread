import { routes } from "@app/configs/constants"
import { useTitle } from "@shared/lib/dom"
import { Link } from "@tanstack/react-router"
import { Button, Col, Empty, Layout, Row, Typography } from "antd"
import { BookCard, BookRowCard } from "entities/book"
import { orderLib, orderModel } from "entities/order"
import { TariffRadio } from "entities/tariff"
import { Cart } from "features/cart"
import { Fav } from "features/fav"

function Order() {
   useTitle("Cart | Rentread")
   return (
      <Layout.Content>
         <Cart.Steps.View current={0} className="mb-10" />
         <Layout>
            <Content />
            <Sidebar />
         </Layout>
      </Layout.Content>
   )
}

const Content = () => {
   const order = orderModel.cart.useOrder()
   const durations = orderModel.cart.useOrderDurations()

   return (
      <Layout>
         <Typography.Title level={2}>Cart</Typography.Title>
         <section>
            <Typography.Title level={3} type="secondary">
               Order contents
            </Typography.Title>
            <Typography.Text className="block mb-5" type="secondary">
               Check selected books before checkout
            </Typography.Text>
            <Row gutter={[0, 20]}>
               {order.books.map(book => {
                  const rent = orderLib.getRentInfo(book.id)
                  return (
                     <Col key={book.id} span={24}>
                        <BookRowCard
                           data={book}
                           size="large"
                           actions={
                              <>
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
                              </>
                           }
                        />
                     </Col>
                  )
               })}
            </Row>
            {!order.books.length && (
               <Empty
                  className="py-40 text-center text-lightslategray bg-[var(--color-accent)] rounded-[25px]"
                  description="Order is empty"
               />
            )}
         </section>
         <section className="my-14">
            <RecommendationsSection />
         </section>
      </Layout>
   )
}

const RecommendationsSection = () => {
   const recommended = orderModel.cart.useRecommended()

   if (!recommended.books) return null

   return (
      <>
         <Typography.Title level={3} type="secondary">
            Take a closer look as well
         </Typography.Title>
         <Typography.Text className="block mb-5" type="secondary">
            A selection of recommended books based on your order
         </Typography.Text>
         <Row className="overflow-auto pb-5" wrap={false} gutter={[20, 0]}>
            {recommended.books
               .filter(b => orderLib.getRentInfo(b.id).status === "RENTABLE")
               .map(b => (
                  <Col key={b.id} span={8}>
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
   const { isEmptyCart } = orderModel.cart.useOrderValidation()

   return (
      <Layout.Sider width={400}>
         <Cart.TotalInfo.Card>
            <Link to={routes.CHECKOUT}>
               {isEmptyCart ? (
                  <Button block type="default" style={{ height: 50 }} disabled>
                     Proceed to checkout
                  </Button>
               ) : (
                  <Button block type="primary" style={{ height: 50 }}>
                     Proceed to checkout
                  </Button>
               )}
            </Link>
         </Cart.TotalInfo.Card>
      </Layout.Sider>
   )
}

export default Order
