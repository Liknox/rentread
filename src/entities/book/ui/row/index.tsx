import { BookFilled } from "@ant-design/icons"
import { routes } from "@app/configs/constants"
import { isMobile } from "@shared/lib/browser"
import { textOverflow } from "@shared/lib/string"
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
   searchBar?: boolean
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
      fontSize: 50,
      padding: 25,
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

const BookRow = (props: Props) => {
   const { data, size = "default", titleAsLink = true, actions, asSecondary, searchBar = false } = props

   const title = fakeApi.library.books.getShortname(data)
   const price = fakeApi.library.books.getPrice(data)
   const isSmall = size === "small"
   const spanDetails = MAX_SPAN - spanIcon[size] - spanActions - 1

   return (
      <Row
         align="middle"
         className={cn("grid grid-cols-[120px_2fr] md:flex", {
            "grayscale opacity-50": asSecondary,
            "grid-cols-[50px_2fr]": searchBar,
         })}>
         <Col span={spanIcon[size]} className="col-span-1">
            <BookFilled className="bg-accent" style={styleIcon[size]} />
         </Col>
         <Col
            className="flex flex-col justify-center max-w-full   col-span-1 row-span-1"
            style={styleDetails[size]}
            span={spanDetails}>
            {titleAsLink ? (
               <Link className="text-primary w-[95%] leading-normal " to={`${routes.BOOK}/${data.id}`}>
                  {isMobile ? textOverflow(title, 50) : title}
               </Link>
            ) : (
               <span>{searchBar && isMobile ? data.name : title}</span>
            )}

            <span className="text-darkGray">
               {data.publicationYear}, {data.publishingHouse.name}
            </span>

            {!isSmall && <span className="text-[1.4rem] font-medium md:mt-0 mt-1z">{price} $</span>}
         </Col>
         {searchBar || (
            <Col
               span={spanActions}
               className={cn("flex md:block min-w-fit md:min-w-0   col-span-1 row-span-1 mt-4", {
                  // dirty method, don't write like this
                  "flex-col": window.innerWidth < 350,
               })}>
               {actions}
            </Col>
         )}
      </Row>
   )
}

export const BookRowCard = (props: Props) => (
   <Card hoverable className="cursor-default md:shadow-[0_1px_2px_var(--color-shadow)]">
      <BookRow {...props} />
   </Card>
)

export default BookRow
