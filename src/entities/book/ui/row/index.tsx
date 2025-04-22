import { BookFilled } from "@ant-design/icons"
import { Link } from "@tanstack/react-router"
import { Card, Col, Row, Skeleton } from "antd"
import cn from "classnames"
import type { CSSProperties, ReactNode } from "react"

import { ROUTES } from "@app/configs/constants"
import { useMobileDetection } from "@shared/lib/browser"
import { useSkeleton } from "@shared/lib/skeleton/useSkeleton"
import { textOverflow } from "@shared/lib/string"
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
   cartBar?: boolean
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
   const isMobile = useMobileDetection()
   const spanDetails = MAX_SPAN - spanIcon[size] - spanActions - 1
   const isLoading = useSkeleton("book-row")

   /**
    * @component Skeleton
    */
   if (isLoading) {
      return (
         <Row align="middle" className="grid grid-cols-[120px_2fr] md:flex">
            <Col span={spanIcon[props.size || "default"]} className="col-span-1 mr-2 p-4">
               <Skeleton.Avatar active shape="square" style={styleIcon[props.size || "default"]} />
            </Col>
            <Col
               className="flex flex-col justify-center max-w-full col-span-1 row-span-1 p-4"
               span={MAX_SPAN - spanIcon[props.size || "default"] - spanActions - 1}>
               <Skeleton active paragraph={{ rows: 3 }} />
            </Col>
         </Row>
      )
   }

   return (
      <Row
         align="middle"
         className={cn("grid grid-cols-[120px_2fr] md:flex", {
            "grayscale opacity-50": asSecondary,
            "grid-cols-[50px_2fr]": searchBar,
         })}>
         <Col span={spanIcon[size]} className="col-span-1 mr-2">
            <BookFilled className="bg-accent rounded-md" style={styleIcon[size]} />
         </Col>
         <Col
            className="flex flex-col justify-center max-w-full col-span-1 row-span-1"
            style={styleDetails[size]}
            span={spanDetails}>
            {titleAsLink ? (
               <Link className="text-primary w-[95%] leading-normal" to={`${ROUTES.BOOK}/${data.id}`}>
                  {isMobile || searchBar ? textOverflow(data.name, 50) : title}
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
            <Col span={spanActions} className={cn("flex md:block min-w-fit md:min-w-0 col-span-1 row-span-1 mt-4")}>
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
