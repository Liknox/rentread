import { useTitle } from "@shared/lib/dom"
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
