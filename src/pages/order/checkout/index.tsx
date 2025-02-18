import { useTitle } from "@shared/lib/dom"
import { Cart } from "features/cart"

function Checkout() {
   useTitle("Checkout | Rentread")
   return (
      <Layout.Content>
         <Cart.Steps.View current={1} className="mb-10" />
         <Layout>
         </Layout>
      </Layout.Content>
   )
}
}

export default Checkout
