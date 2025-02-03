import { BookFilled } from "@ant-design/icons"
import { Link } from "@tanstack/react-router"
import { Card, Col, Row } from "antd"
import cn from "classnames"
import type { CSSProperties, ReactNode } from "react"

import type { AbstractBook } from "shared/api"
import { fakeApi } from "shared/api"

type Size = "large" | "default" | "small"
type Props = {
   data: AbstractBook
   titleAsLink?: boolean
   size?: Size
   actions?: ReactNode
   asSecondary?: boolean
}

const spanIcon: Record<Size, number> = {
   small: 2,
   default: 3,
   large: 4,
}

const styleIcon: Record<Size, CSSProperties> = {
   small: {
      fontSize: 20,
      padding: 10,
   },
   default: {
      fontSize: 60,
      padding: 30,
   },
   large: {
      fontSize: 80,
      padding: 40,
   },
}

const styleDetails: Record<Size, CSSProperties> = {
   small: {},
   default: {},
   large: {
      fontSize: 18,
      lineHeight: "40px",
      marginLeft: 20,
   },
}

const spanActions = 5

const MAX_SPAN = 24

// FIXME:
// eslint-disable-next-line max-lines-per-function
const BookRow = (props: Props) => {
   const { data, size = "default", titleAsLink = true, actions, asSecondary } = props

   const title = fakeApi.library.books.getShortname(data)
   const price = fakeApi.library.books.getPrice(data)
   const isSmall = size === "small"
   const spanDetails = MAX_SPAN - spanIcon[size] - spanActions - 1

   return (
      <Row align="middle" className={cn({ "grayscale opacity-50": asSecondary })}>
         <Col span={spanIcon[size]}>
            <BookFilled className="bg-accent" style={styleIcon[size]} />
         </Col>
         <Col className="flex flex-col justify-center" style={styleDetails[size]} span={spanDetails}>
            {titleAsLink ? <Link to={`/book/${data.id}`}>{title}</Link> : <span>{title}</span>}

            <span className="text-darkGray">
               {data.publicationYear}, {data.publishingHouse.name}
            </span>

            {!isSmall && <span className="text-[1.4rem] font-medium">{price} ₽</span>}
         </Col>
         <Col span={spanActions}>{actions}</Col>
      </Row>
   )
}

// const Actions = ({ title }: { title: string }) => (
//     <>
//         <Button
//             type="default"
//             icon={<HeartOutlined />}
//             onClick={() => alert.success("Добавлено в избранное", title)}
//             block
//         >
//             Add to favorites
//         </Button>
//     </>
// );

export const BookRowCard = (props: Props) => (
   <Card hoverable className="cursor-default">
      <BookRow {...props} />
   </Card>
)

export default BookRow
