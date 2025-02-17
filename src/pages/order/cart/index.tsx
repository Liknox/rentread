import { Button, Layout } from "antd"
import { Cart } from "features/cart"

function Order() {
   return (
      <Layout.Content>
         <Cart.Steps.View current={0} className="mb-10" />
         <Layout>
         </Layout>
      </Layout.Content>
   )
}

export default Order
