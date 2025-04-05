import { Col, Row } from "antd"

import { BookCard } from "entities/book"
import { type AbstractBook, fakeApi } from "shared/api"

const Books = () => {
   const booksQuery = fakeApi.library.books.getPopular()

   return (
      <Row justify="space-between" className="sm:flex sm:flex-row flex-col gap-2 lg:gap-0">
         {booksQuery.map((book: AbstractBook) => (
            <Col
               key={book.id}
               className="px-0 mt-5 sm:px-2 2xl:px-4 xl:mt-0 md:min-w-[350px] xl:min-w-[280px] max-w-none"
               span={6}>
               <BookCard data={book} size="small" className="h-full" />
            </Col>
         ))}
      </Row>
   )
}

export { Books }
