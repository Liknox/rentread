import { MAP_ANCHORS, routes } from "@app/configs/constants"
import { TRANSLATIONS } from "@app/configs/constants/translation"
import { fakeApi } from "@shared/api"
import { isMobile } from "@shared/lib/browser"
import { useTitle } from "@shared/lib/dom"
import { Link } from "@tanstack/react-router"
import { Button, Checkbox, Col, DatePicker, Input, Layout, Result, Row, Select, Typography } from "antd"
import cn from "classnames"
import dayjs from "dayjs"
import { orderModel } from "entities/order"
import { viewerModel } from "entities/viewer"
import { Cart } from "features/cart"
import { Wallet } from "features/wallet"
import moment from "moment"
import { Marker, Map as PMap } from "pigeon-maps"
import { useState } from "react"
import { useTranslation } from "react-i18next"

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
   const { t } = useTranslation()
   useTitle(t(TRANSLATIONS.pageTitle.checkout))
   return (
      <Layout.Content>
         <Cart.Steps.View current={1} className="mb-10" />
         <Layout className="flex !flex-col md:!flex-row">
            <Content />
            <Sidebar />
         </Layout>
      </Layout.Content>
   )
}

const Content = () => {
   return (
      <Layout className={cn({ "!w-full": isMobile })}>
         <Link to={routes.ORDER}>Return to cart</Link>
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
            <DeliveryForm />
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
            <Result
               className={cn({ "!p-0": isMobile })}
               status="warning"
               title="Insufficient funds on the account"
               extra={<Wallet.AddFunds.Form />}
            />
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
      <Layout.Sider width={isMobile ? "100%" : 400} className="mt-8 md:mt-0">
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

const DeliveryForm = () => {
   const [mode, setMode] = useState<"MANUAL" | "COFFESHOP">("MANUAL")
   const { date, address } = orderModel.cart.useDeliveryStore()
   const shopsQuery = fakeApi.checkout.coffeeshops.getAll()
   const shopsOptions = shopsQuery.map(cs => ({
      value: String(cs.id),
      label: (
         <article>
            <b>{cs.name}</b>
            <ul>
               <li>{cs.address}</li>
               <li>{dayjs(cs.deliveryAt).format("DD/MM/YYYY")}</li>
            </ul>
         </article>
      ),
   }))

   return (
      <Row
         className={cn(
            "md:min-h-[500px] overflow-hidden bg-[var(--color-accent)] border border-[var(--color-accent)] rounded-[25px]",
            { "flex-col": isMobile },
         )}
         justify="space-between">
         <Col span={isMobile ? "full" : 10} className="p-10">
            <Typography.Title level={4}>Select a delivery method</Typography.Title>
            <Checkbox
               onChange={e => {
                  orderModel.cart.events.setDelivery({ address: "", date: "" })
                  setMode(e.target.checked ? "COFFESHOP" : "MANUAL")
               }}
               checked={mode === "COFFESHOP"}
               style={{ marginBottom: 20 }}>
               Pick up at the nearest meetup in a coffee shop
            </Checkbox>
            {mode === "MANUAL" && (
               <>
                  <Input
                     key={mode}
                     placeholder="Chose delivery address..."
                     defaultValue={address}
                     onChange={e => orderModel.cart.events.setDelivery({ address: e.target.value })}
                  />
                  <DatePicker
                     placeholder="Chose delivery time..."
                     style={{ width: "100%", marginTop: 20 }}
                     value={date ? moment(date) : undefined}
                     onChange={value => orderModel.cart.events.setDelivery({ date: value?.toISOString() })}
                  />
               </>
            )}
            {mode === "COFFESHOP" && (
               <Select
                  options={shopsOptions}
                  style={{ width: "100%" }}
                  placeholder="Chose coffee shop..."
                  onSelect={value => {
                     const shop = shopsQuery.find(cs => String(cs.id) === value)
                     if (!shop) return
                     orderModel.cart.events.setDelivery({
                        address: shop.address,
                        date: shop.deliveryAt,
                     })
                  }}
               />
            )}
         </Col>
         <Col span={isMobile ? "full" : 12} className={cn({ "h-[400px]": isMobile })}>
            <PMap
               defaultCenter={MAP_ANCHORS.DEFAULT} // Lviv Coordinates
               dprs={[1, 2]}
               defaultZoom={14}>
               <Marker anchor={MAP_ANCHORS.OPERA} width={50} payload={"Pick up point"} /> {/* Opera */}
               <Marker anchor={MAP_ANCHORS.MCDONALDS} width={50} payload={"Pick up point"} /> {/* McDonald's */}
               <Marker anchor={MAP_ANCHORS.HIHGCASTLE} width={50} payload={"Pick up point"} /> {/* High Castle */}
            </PMap>
         </Col>
      </Row>
   )
}

export default Checkout
