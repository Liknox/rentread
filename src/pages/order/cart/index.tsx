import { Link } from "@tanstack/react-router"
import { Button, Layout } from "antd"
import { orderModel } from "entities/order"
import { Cart } from "features/cart"

function Order() {
   return (
      <Layout.Content>
         <Cart.Steps.View current={0} className="mb-10" />
         <Layout>
            <Sidebar></Sidebar>
         </Layout>
      </Layout.Content>
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
