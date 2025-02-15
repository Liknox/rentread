import { useMatch } from "@tanstack/react-router"

function BookPage() {
   const { params } = useMatch({ from: "/book/$bookId" }) as { params: { bookId: string } }

   const bookId = Number(params?.bookId)
   const book = fakeApi.library.books.getById(bookId)


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
