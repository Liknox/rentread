import { BookFilled } from "@ant-design/icons"
import { Link } from "@tanstack/react-router"
import { Card, Skeleton } from "antd"
import cn from "classnames"
import type { CSSProperties, ReactNode } from "react"
import { useTranslation } from "react-i18next"

import { ROUTES, SKELETON_KEYS } from "@app/configs/constants"
import { TRANSLATIONS } from "@app/configs/constants/translation"
import { useMobileDetection } from "@shared/lib/browser"

import type { AbstractBook } from "shared/api"
import { fakeApi } from "shared/api"
import { string } from "shared/lib"

import { useSkeleton } from "@shared/lib/skeleton/useSkeleton"

type Size = "default" | "small" | "mini"

type BookCardProps = {
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

const BookCard = (props: BookCardProps) => {
   const { t } = useTranslation()
   const isMobileView = useMobileDetection()
   const isLoading = useSkeleton(SKELETON_KEYS.BOOK_CARD)

   /**
    * @component Skeleton
    */
   if (isLoading) {
      return (
         <Card
            className={cn(
               "relative cursor-default rounded-lg shadow-[2px_2px_22px_var(--color-shadow)] h-[450px]",
               props.className,
            )}
            cover={<Skeleton.Image active style={{ width: "100%", height: 300 }} />}>
            <Skeleton active paragraph={{ rows: 3 }} />
         </Card>
      )
   }

   const { data: book, className, size = "default", children, actions, withPrice = true, asSecondary } = props

   const author = book.authors.map(fakeApi.library.authors.getShortname).join(", ")
   const publisher = `${book.publishingHouse.name}`
   const title = `${author} — ${book.name}`
   const description = `${publisher} (${book.publicationYear})`

   const isDefault = size === "default"
   const isMini = size === "mini"
   const withDescription = props.withDescription || isDefault
   const maxTitleLength = isMobileView ? 30 : 50

   return (
      <Card
         key={book.id}
         hoverable
         styles={{ body: bodyStyle[size] }}
         cover={<BookFilled style={imgStyle[size]} />}
         className={cn(
            "relative cursor-default rounded-lg shadow-[2px_2px_22px_var(--color-shadow)]",
            {
               "grayscale opacity-50": asSecondary,
            },
            className,
         )}
         actions={isMini || !actions?.length ? undefined : actions}>
         <Card.Meta
            className="space-y-2"
            title={
               <div className="flex flex-col">
                  {withPrice && (
                     <span className="font-semibold text-[20px]">
                        {t(TRANSLATIONS.book.from)} {fakeApi.library.books.getPrice(book)} $
                     </span>
                  )}
                  {!isMini && (
                     <Link
                        to={`${ROUTES.BOOK}/${book.id}`}
                        title={title}
                        className="text-blue-500 hover:underline whitespace-normal">
                        {string.textOverflow(title, maxTitleLength)}
                     </Link>
                  )}
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
