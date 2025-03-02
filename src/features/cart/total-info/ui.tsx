import { BookOutlined, ClockCircleOutlined } from "@ant-design/icons"
import { Col, Divider, Row, Typography } from "antd"

import { routes } from "@app/configs/constants"
import { Link } from "@tanstack/react-router"
import { BookCard } from "entities/book"
import { orderModel } from "entities/order"
import type { ReactNode } from "react"
import { useTranslation } from "react-i18next"
import { TRANSLATIONS } from "@app/configs/constants/translation"

export const PLACEHOLDER = TRANSLATIONS.order.sidebar.empty

const useDurations = () => {
   const { t } = useTranslation()
   const durations = orderModel.cart.useOrderDurations()

   const durationsSorted = Object.values(durations).sort((a, b) => a - b)

   const from = durationsSorted[0]
   const to = durationsSorted[durationsSorted.length - 1]

   if (durationsSorted.length === 0) {
      return PLACEHOLDER
   }

   if (from === to) {
      return `${t(TRANSLATIONS.order.sidebar.for)} ${from} ${t(TRANSLATIONS.order.sidebar.duration)}`
   }

   return `For ${from}-${to} d.`
}
export const Form = () => {
   const { t } = useTranslation()
   const order = orderModel.cart.useOrder()
   const totalDuration = useDurations()

   return (
      <section className="p-10">
         <Row justify="space-between" align="middle">
            <Typography.Title level={4}>{t(TRANSLATIONS.order.sidebar.total)}</Typography.Title>
            <Typography.Title level={4} style={{ margin: 0 }}>
               {order.price} $
            </Typography.Title>
         </Row>
         <Row align="middle" className="pt-1">
            <BookOutlined />
            &nbsp;
            <Typography.Text type="secondary">
               {order.books.length
                  ? `${order.books.length} ${t(order.books.length > 1 ? (order.books.length >= 2 && order.books.length < 5 ? TRANSLATIONS.order.sidebar.books : TRANSLATIONS.order.sidebar.bookss) : TRANSLATIONS.order.sidebar.book)}`
                  : t(PLACEHOLDER)}
            </Typography.Text>
         </Row>
         <Row align="middle" className="pt-1">
            <ClockCircleOutlined />
            &nbsp;
            <Typography.Text type="secondary">{t(totalDuration)}</Typography.Text>
         </Row>
      </section>
   )
}

type Props = {
   children?: ReactNode
}
export const Card = ({ children }: Props) => {
   return (
      <article className="md:ml-10 text-center rounded-[10px] shadow-insetDark md:shadow-inset">
         <Form />
         <Divider style={{ margin: 0 }} />
         <section className="p-10">{children}</section>
      </article>
   )
}

export const CartMini = () => {
   const order = orderModel.cart.useOrder()

   return (
      <article className="ml-0 md:ml-10 text-center rounded-[10px] shadow-inset p-5">
         <Typography.Title level={4} type="secondary">
            Your order
         </Typography.Title>
         <Row justify="space-between" gutter={[0, 30]} className="mt-4">
            {order.books.map(book => (
               <Col key={book.id} span={11}>
                  <Link to={`${routes.BOOK}/${book.id}`} title={book.name}>
                     <BookCard data={book} size="mini" className="cursor-pointer" />
                  </Link>
               </Col>
            ))}
         </Row>
      </article>
   )
}
