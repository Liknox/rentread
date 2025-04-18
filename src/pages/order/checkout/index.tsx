import { Link, useNavigate } from "@tanstack/react-router"
import { Button, Checkbox, Col, DatePicker, Input, Layout, Result, Row, Select, Typography } from "antd"
import cn from "classnames"
import dayjs from "dayjs"
import moment from "moment"
import { Marker, Map as PMap } from "pigeon-maps"
import { useState } from "react"
import { useTranslation } from "react-i18next"
import { v4 as uuid } from "uuid"

import { MAP_ANCHORS, routes } from "@app/configs/constants"
import { TRANSLATIONS } from "@app/configs/constants/translation"
import { fakeApi } from "@shared/api"
import { isMobile, useMobileDetection } from "@shared/lib/browser"
import { useTitle } from "@shared/lib/dom"
import { orderLib, orderModel } from "entities/order"
import { walletModel } from "entities/wallet"
import { Cart } from "features/cart"
import { Wallet } from "features/wallet"

const useCheckoutValidation = () => {
   const { price } = orderModel.useOrder()
   const delivery = orderModel.useDelivery()
   const { wallet } = walletModel.useViewerWallet()
   const { isEmptyCart } = orderModel.useOrderValidation()

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
   const { t } = useTranslation()
   const isMobile = useMobileDetection()
   return (
      <Layout className={cn({ "!w-full": isMobile })}>
         <Link to={routes.ORDER} className="text-primary">
            {t(TRANSLATIONS.order.checkout.returnToCart)}
         </Link>
         <Typography.Title level={2}>{t(TRANSLATIONS.order.checkout.title)}</Typography.Title>
         <section className="mb-10">
            <Typography.Title level={3} type="secondary">
               {t(TRANSLATIONS.order.checkout.subtitle)}
            </Typography.Title>
            <Typography.Text className="block mb-5" type="secondary">
               {t(TRANSLATIONS.order.checkout.description)}
            </Typography.Text>
            <WalletForm />
         </section>
         <section className="mb-10">
            <Typography.Title level={3} type="secondary">
               {t(TRANSLATIONS.order.checkout.deliveryTitle)}
            </Typography.Title>
            <Typography.Text className="block mb-5" type="secondary">
               {t(TRANSLATIONS.order.checkout.deliveryDescription)}
            </Typography.Text>
            <DeliveryForm />
         </section>
      </Layout>
   )
}

const WalletForm = () => {
   const { t } = useTranslation()
   const validation = useCheckoutValidation()
   return (
      <Row gutter={[0, 20]} className="p-5 bg-accent rounded-[25px]" justify="center">
         {validation.isEnoughMoney ? (
            <Result status="success" title={t(TRANSLATIONS.order.checkout.sufficientMoney)} />
         ) : (
            <Result
               className={cn({ "!p-0": isMobile })}
               status="warning"
               title={t(TRANSLATIONS.order.checkout.insufficientMoney)}
               extra={<Wallet.AddFunds.Form />}
            />
         )}
      </Row>
   )
}

const Sidebar = () => {
   const { t } = useTranslation()
   const navigate = useNavigate()
   const viewer = walletModel.useViewerWallet()
   const order = orderModel.useOrder()
   const validation = useCheckoutValidation()
   // const history = useHistory();
   // hooks.useRedirectOn(isEmptyCart, "/order");

   const handleButtonClick = () => {
      viewer.payment.applyTransaction(-order.price).then(() => {
         orderLib.submitOrder()
         navigate({ to: `/order/result/${uuid()}` })
      })
   }

   return (
      <Layout.Sider width={useMobileDetection() ? "100%" : 400} className="mt-8 md:mt-0">
         <Cart.TotalInfo.Card>
            {validation.isTotallyAllowed ? (
               <Button
                  block
                  type="primary"
                  style={{ height: 50 }}
                  title={validation.message}
                  onClick={handleButtonClick}
                  loading={viewer.payment.isPending}>
                  {t(TRANSLATIONS.order.checkout.payOrder)}
               </Button>
            ) : (
               <Button block type="default" style={{ height: 50 }} disabled>
                  {t(TRANSLATIONS.order.checkout.payOrder)}
               </Button>
            )}
         </Cart.TotalInfo.Card>
         {!validation.isEmptyCart && <Cart.TotalInfo.CartMini />}
      </Layout.Sider>
   )
}

const DeliveryForm = () => {
   const { t } = useTranslation()
   const [mode, setMode] = useState<"MANUAL" | "COFFESHOP">("MANUAL")
   const { date, address } = orderModel.useDelivery()
   const shopsQuery = fakeApi.checkout.coffeeshops.getAll()
   const cartDelivery = orderModel.useDeliveryStore()
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
            { "flex-col": useMobileDetection() },
         )}
         justify="space-between">
         <Col span={useMobileDetection() ? "full" : 10} className="p-10">
            <Typography.Title level={4}>{t(TRANSLATIONS.order.checkout.deliveryMethod)}</Typography.Title>
            <Checkbox
               onChange={e => {
                  cartDelivery.setDelivery({ address: "", date: "" })
                  setMode(e.target.checked ? "COFFESHOP" : "MANUAL")
               }}
               checked={mode === "COFFESHOP"}
               style={{ marginBottom: 20 }}>
               {t(TRANSLATIONS.order.checkout.nearestMeetUp)}
            </Checkbox>
            {mode === "MANUAL" && (
               <>
                  <Input
                     key={mode}
                     placeholder={t(TRANSLATIONS.order.checkout.deliveryAddress)}
                     defaultValue={address}
                     onChange={e => {
                        cartDelivery.setDelivery({ address: e.target.value })
                     }}
                  />
                  <DatePicker
                     placeholder={t(TRANSLATIONS.order.checkout.deliveryTime)}
                     style={{ width: "100%", marginTop: 20 }}
                     value={date ? moment(date) : undefined}
                     onChange={value => {
                        cartDelivery.setDelivery({ date: value?.toISOString() })
                     }}
                  />
               </>
            )}
            {mode === "COFFESHOP" && (
               <Select
                  options={shopsOptions}
                  style={{ width: "100%" }}
                  placeholder={t(TRANSLATIONS.order.checkout.deliveryCoffee)}
                  onSelect={value => {
                     const shop = shopsQuery.find(cs => String(cs.id) === value)
                     if (!shop) return
                     cartDelivery.setDelivery({
                        address: shop.address,
                        date: shop.deliveryAt,
                     })
                  }}
               />
            )}
         </Col>
         <Col span={useMobileDetection() ? "full" : 12} className={cn({ "h-[400px]": useMobileDetection() })}>
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
