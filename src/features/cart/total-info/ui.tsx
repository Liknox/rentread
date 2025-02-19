import { Typography, Row, Divider, Col } from "antd"
import { BookOutlined, ClockCircleOutlined } from "@ant-design/icons"

import { orderModel } from "entities/order"
import { BookCard } from "entities/book"
import { Link } from "@tanstack/react-router"
import { ReactNode } from "react"
import { routes } from "@app/configs/constants"

export const PLACEHOLDER = "Order is empty"

const useDurations = () => {
   const durations = orderModel.cart.useOrderDurations()

   const durationsSorted = Object.values(durations).sort((a, b) => a - b)

   const from = durationsSorted[0]
   const to = durationsSorted[durationsSorted.length - 1]

   if (durationsSorted.length === 0) {
      return PLACEHOLDER
   }

   if (from === to) {
      return `For ${from} d.`
   }

   return `For ${from}-${to} d.`
}
export const Form = () => {
   const order = orderModel.cart.useOrder()
   const totalDuration = useDurations()

   return (
      <section className="p-10">
         <Row justify="space-between" align="middle">
            <Typography.Title level={4}>Total</Typography.Title>
            <Typography.Title level={4} style={{ margin: 0 }}>
               {order.price} $
            </Typography.Title>
         </Row>
         <Row align="middle" className="pt-1">
            <BookOutlined />
            &nbsp;
            <Typography.Text type="secondary">
               {order.books.length
                  ? `${order.books.length}${order.books.length === 1 ? " book" : " books"}`
                  : PLACEHOLDER}
            </Typography.Text>
         </Row>
         <Row align="middle" className="pt-1">
            <ClockCircleOutlined />
            &nbsp;
            <Typography.Text type="secondary">{totalDuration}</Typography.Text>
         </Row>
      </section>
   )
}

type Props = {
   children?: ReactNode
}
export const Card = ({ children }: Props) => {
   return (
      <article className="ml-10 text-center rounded-[10px] shadow-inset">
         <Form />
         <Divider style={{ margin: 0 }} />
         <section className="p-10">{children}</section>
      </article>
   )
}

export const CartMini = () => {
   const order = orderModel.cart.useOrder()

   return (
      <article className="ml-10 text-center rounded-[10px] shadow-inset p-5">
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
