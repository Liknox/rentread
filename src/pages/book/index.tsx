import { Button, Carousel, Col, Descriptions, Layout, Result, Row, Typography } from "antd"

function BookPage() {
   const { params } = useMatch({ from: "/book/$bookId" }) as { params: { bookId: string } }

   const bookId = Number(params?.bookId)
   const book = fakeApi.library.books.getById(bookId)

   if (!book) {
      return (
         <Layout.Content className="flex justify-center items-center">
            <Result
               status="404"
               title="404"
               subTitle="Book not found"
               extra={<Button href="/catalog">To the catalog</Button>}
            />
         </Layout.Content>
      )
   }

   return (
      <Layout.Content className="mb-20">
         <Link to="/catalog" className="text-primary">
            Каталог
         </Link>
         <Typography.Title level={2}>{fakeApi.library.books.getBookString(book)}</Typography.Title>
         <Row className="mt-8 mb-20">
         </Row>
         <Row>{/* <Recommendations book={book} /> */}</Row>
      </Layout.Content>
   )
}
}

export default BookPage
