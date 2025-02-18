import { useTitle } from "@shared/lib/dom"
import { Link } from "@tanstack/react-router"
import { Button, Checkbox, Col, DatePicker, Input, Layout, Result, Row, Select, Typography } from "antd"
import { orderModel } from "entities/order"
import { viewerModel } from "entities/viewer"
import { Cart } from "features/cart"

const useCheckoutValidation = () => {
   const { price } = orderModel.cart.useOrder()
   const delivery = orderModel.cart.useDeliveryStore()
   const { wallet } = viewerModel.useViewerWallet()
   const { isEmptyCart } = orderModel.cart.useOrderValidation()

   const isEnoughMoney = wallet >= price
   const message = isEnoughMoney ? "" : "Insufficient funds for payment"
   const isDeliveryAssigned = !!delivery.date && !!delivery.address

   const isTotallyAllowed = isEnoughMoney && isDeliveryAssigned && !isEmptyCart

   return { isEnoughMoney, message, isDeliveryAssigned, isEmptyCart, isTotallyAllowed }
}

function Checkout() {
   useTitle("Checkout | Rentread")
   return (
      <Layout.Content>
         <Cart.Steps.View current={1} className="mb-10" />
         <Layout>
            <Sidebar />
         </Layout>
      </Layout.Content>
   )
}

const Content = () => {
   return (
      <Layout>
         <Link to="/order">Return to cart</Link>
         <Typography.Title level={2}>Order processing</Typography.Title>
         <section className="mb-10">
            <Typography.Title level={3} type="secondary">
               Payment
            </Typography.Title>
            <Typography.Text className="block mb-5" type="secondary">
               Funds will be deducted from your internal wallet
            </Typography.Text>
            <WalletForm />
         </section>
         <section className="mb-10">
            <Typography.Title level={3} type="secondary">
               Delivery
            </Typography.Title>
            <Typography.Text className="block mb-5" type="secondary">
               Specify and verify the delivery method and address.
            </Typography.Text>
         </section>
      </Layout>
   )
}

const WalletForm = () => {
   const validation = useCheckoutValidation()
   return (
      <Row gutter={[0, 20]} className="p-5 bg-accent rounded-[25px]" justify="center">
         {validation.isEnoughMoney ? (
            <Result status="success" title="Sufficient funds on the account" />
         ) : (
            <Result status="warning" title="Insufficient funds on the account" extra={<Wallet.AddFunds.Form />} />
         )}
      </Row>
   )
}

const Sidebar = () => {
   const viewer = viewerModel.useViewerWallet()
   const order = orderModel.cart.useOrder()
   const validation = useCheckoutValidation()
   // const history = useHistory();
   // hooks.useRedirectOn(isEmptyCart, "/order");

   return (
      <Layout.Sider width={400}>
         <Cart.TotalInfo.Card>
            {validation.isTotallyAllowed ? (
               <Button
                  block
                  type="primary"
                  style={{ height: 50 }}
                  title={validation.message}
                  onClick={() =>
                     viewer.payment.applyTransaction(-order.price).then(() => {
                        orderModel.cart.events.submitOrder()
                     })
                  }
                  loading={viewer.payment.isPending}>
                  Pay for the order
               </Button>
            ) : (
               <Button block type="default" style={{ height: 50 }} disabled>
                  Pay for the order
               </Button>
            )}
         </Cart.TotalInfo.Card>
         {!validation.isEmptyCart && <Cart.TotalInfo.CartMini />}
      </Layout.Sider>
   )
}

}

export default Checkout
