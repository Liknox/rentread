import { Layout, Button, Result } from "antd"

import { Cart } from "features/cart"
import { useTitle } from "@shared/lib/dom"
import { Link } from "@tanstack/react-router"

// !!! FIXME: split by features!
// TODO: Add skeletons loader

/**
 * @page Order Confirmation Page
 */
const ResultPage = () => {
   // const { isEmptyCart } = orderModel.cart.useOrderValidation();
   // FIXME: Rewrite later with promise
   useTitle("Order Confirmation Page | Rentread")
   // hooks.useRedirectOn(isEmptyCart, "/order");

   return (
      <Layout.Content>
         <Cart.Steps.View current={2} className="mb-10" />
         <Layout>
            <Result
               status="success"
               title="The order has been successfully paid and completed!"
               subTitle="Please wait for delivery within the timeframe specified in your order."
               extra={[
                  <Link to="/profile#opened" key="order">
                     <Button type="primary">To your order</Button>
                  </Link>,
                  <Link to="/catalog" key="catalog">
                     <Button>To Catalog</Button>
                  </Link>,
               ]}
            />
         </Layout>
      </Layout.Content>
   )
}

export default ResultPage
