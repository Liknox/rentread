import { BookFilled } from "@ant-design/icons"
import { Link } from "@tanstack/react-router"
import { Card } from "antd"
import cn from "classnames"
import type { CSSProperties, ReactNode } from "react"

import type { AbstractBook } from "shared/api"
import { fakeApi } from "shared/api"
import { string } from "shared/lib"

type Size = "default" | "small" | "mini"

type Props = {
   data: AbstractBook
   children?: ReactNode
   className?: string
   size?: Size
   actions?: ReactNode[]
   withDescription?: boolean
   withPrice?: boolean
   asSecondary?: boolean
}

const bodyStyle: Record<Size, CSSProperties> = {
   default: { height: 176 },
   small: { height: 176 },
   mini: { display: "none" },
}

const imgStyle: Record<Size, CSSProperties> = {
   default: { padding: "100px 0", fontSize: 100 },
   small: { padding: "80px 0", fontSize: 100 },
   mini: { padding: "40px 0", fontSize: 70 },
}

const BookCard = (props: Props) => {
   const { data: b, className, size = "default", children, actions, withPrice = true, asSecondary } = props
   const author = b.authors.map(fakeApi.library.authors.getShortname).join(", ")
   const publisher = `${b.publishingHouse.name}`
   const title = `${author} — ${b.name}`
   const description = `${publisher} (${b.publicationYear})`

   const isDefault = size === "default"
   const isMini = size === "mini"
   const withDescription = props.withDescription || isDefault

   return (
      <Card
         key={b.id}
         hoverable
         styles={{ body: bodyStyle[size] }}
         cover={<BookFilled style={imgStyle[size]} />}
         className={cn(
            "relative cursor-default rounded-lg shadow-md",
            {
               "grayscale opacity-50": asSecondary,
               "p-6": size === "default",
               // "p-4": size === "small",
               "p-2": size === "mini",
            },
            className,
         )}
         actions={isMini || !actions?.length ? undefined : actions}>
         <Card.Meta
            className="space-y-2"
            title={
               <div className="flex flex-col">
                  {withPrice && (
                     <span className="font-semibold text-[20px]">from {fakeApi.library.books.getPrice(b)} $</span>
                  )}
                  <Link to={`/book/${b.id}`} title={title} className="text-blue-500 hover:underline whitespace-normal">
                     {string.textOverflow(title, 50)}
                  </Link>
               </div>
            }
            description={
               <div>
                  {withDescription && <span className="text-gray-600">{description}</span>}
                  {children}
               </div>
            }
         />
      </Card>
   )
}

export default BookCard
