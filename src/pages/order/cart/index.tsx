import { Link } from "@tanstack/react-router"
import { Button, Col, Empty, Layout, Row, Typography } from "antd"
import { BookRowCard } from "entities/book"
import { orderModel } from "entities/order"
import { TariffRadio } from "entities/tariff"
import { Cart } from "features/cart"

function Order() {
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
               {order.books.map(book => (
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
                                 value={durations[book.id] || 14}
                              />
                           </>
                        }
                     />
                  </Col>
               ))}
            </Row>
            {!order.books.length && (
               <Empty
                  className="py-40 text-center text-lightslategray bg-[var(--color-accent)] rounded-[25px]"
                  description="Order is empty"
               />
            )}
         </section>
      </Layout>
   )
}

const Sidebar = () => {
   const { isEmptyCart } = orderModel.cart.useOrderValidation()

   return (
      <Layout.Sider width={400}>
         <Cart.TotalInfo.Card>
            <Link to="/order/checkout">
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
