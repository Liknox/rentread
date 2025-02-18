import { useTitle } from "@shared/lib/dom"
import { Cart } from "features/cart"

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
   const validation = useCheckoutValidation()
   return (
      <Layout.Sider width={400}>
         <Cart.TotalInfo.Card>
            {validation.isTotallyAllowed ? (
               <Button
                  block
                  type="primary"
                  style={{ height: 50 }}
                  title={validation.message}
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
