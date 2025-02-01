/* eslint-disable @typescript-eslint/no-explicit-any */
import { Col, Row } from "antd"
import { BookCard } from "entities/book"
import { fakeApi } from "shared/api"

const Books = () => {
   const booksQuery = fakeApi.library.books.getPopular()

   return (
      <Row justify="space-between">
         {booksQuery.map((book: any) => (
            <Col key={book.id} className="px-5" span={6}>
               <BookCard data={book} size="small" className="h-full" />
            </Col>
         ))}
      </Row>
   )
}

export { Books }
