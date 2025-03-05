import type { CheckCircleOutlined } from "@ant-design/icons"
import { Badge, Col, Empty, Row, Typography } from "antd"
import cn from "classnames"
import type { CSSProperties, ReactNode } from "react"

import { TRANSLATIONS } from "@app/configs/constants/translation"
import { BookCard } from "entities/book"
import { useTranslation } from "react-i18next"
import type { AbstractBook, Book } from "shared/api"

type Props<T> = {
   id: string
   title: ReactNode
   titleAfter?: ReactNode
   description: ReactNode
   renderBookDetails?: (book: T, idx: number) => ReactNode
   renderBookActions?: (book: T, idx: number) => ReactNode[]
   getRibbonProps?: (
      book: T,
      idx: number,
   ) => {
      text: ReactNode
      color: CSSProperties["color"]
   }
   // FIXME: specify later
   Icon: typeof CheckCircleOutlined
   books: T[]
   active?: boolean
}

export function Section<T extends Book | AbstractBook>(props: Props<T>) {
   const { t } = useTranslation()
   const { title, description, books, Icon, id, titleAfter, active } = props

   return (
      <section
         className={cn("p-5 md:p-10 mb-10 border border-accent rounded-[25px] transition duration-200", {
            "!border-primary": active,
         })}
         id={id}>
         <Row justify="space-between">
            <Typography.Title level={3}>
               <a className="mr-1 ml-[-20px] opacity-0" href={`#${id}`}>
                  #
               </a>
               {title} <Icon style={{ color: "gray", fontSize: 20 }} />
            </Typography.Title>
            {titleAfter}
         </Row>
         <Typography.Text type="secondary" className="font-roboto block mb-5">
            {description}
         </Typography.Text>
         <Row
            gutter={[10, 10]}
            wrap={false}
            className="overflow-auto pb-5 2xl:max-w-[50vw] xl:max-w-[45vw] md:max-w-[30vw]">
            {books.map((book, idx) => (
               <Col key={book.id} span={8} className="min-w-full md:min-w-[315px] md:max-w-[315px]">
                  <Badge.Ribbon
                     {...props.getRibbonProps?.(book, idx)}
                     style={{
                        right: "-5px",
                        opacity: Number(props.getRibbonProps !== undefined),
                     }}>
                     <BookCard
                        // @ts-expect-error warning
                        data={book.abstractBook || book}
                        size="small"
                        withPrice={false}
                        actions={props.renderBookActions?.(book, idx)}>
                        {props.renderBookDetails?.(book, idx)}
                     </BookCard>
                  </Badge.Ribbon>
               </Col>
            ))}
         </Row>
         {!books.length && <Empty description={t(TRANSLATIONS.book.empty)} />}
      </section>
   )
}
