import { AbstractBook, fakeApi } from "@shared/api"
import { Link, useMatch } from "@tanstack/react-router"
import { Button, Carousel, Col, Descriptions, Layout, Result, Row, Typography } from "antd"
import { HistoryOutlined, InboxOutlined, BookFilled } from "@ant-design/icons"
import { orderLib } from "entities/order"
import { Cart } from "features/cart"
import { Reserve } from "features/reserve"
import { TariffRadio } from "entities/tariff"
import { Fav } from "features/fav"
import { alert } from "@shared/lib"

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
            <Card book={book} />
         </Row>
         <Row>{/* <Recommendations book={book} /> */}</Row>
      </Layout.Content>
   )
}

type BookProps = {
   book: AbstractBook
}

const Card = ({ book }: BookProps) => {
   const { authors, publicationYear, publishingHouse } = book
   const author = authors.map(fakeApi.library.authors.getShortname).join(", ")

   return (
      <Col span={16}>
         <div className="flex">
            <div className="w-[450px]">
               <Carousel>
                  <div className="h-[640px] text-[300px] text-center select-none bg-[var(--color-accent)]">
                     <BookFilled style={{ marginTop: 150 }} />
                  </div>
                  <div className="h-[640px] text-[300px] text-center select-none bg-[var(--color-accent)]">
                     <BookFilled style={{ marginTop: 150, color: "darkslategray" }} />
                  </div>
                  {/*
                     <div className={styles.cardGalleryItem}>
                        <Typography.Title level={3}>IMG-2</Typography.Title>
                     </div>
                     <div className={styles.cardGalleryItem}>
                        <Typography.Title level={3}>IMG-3</Typography.Title>
                     </div>
                     <div className={styles.cardGalleryItem}>
                        <Typography.Title level={3}>IMG-4</Typography.Title>
                     </div> 
                  */}
               </Carousel>
            </div>
            <div className="mt-10 ml-10">
               <Descriptions
                  title={<span className="text-[20px]">About the book</span>}
                  column={1}
                  contentStyle={{ fontSize: 16 }}>
                  <Descriptions.Item label={<span className="text-dark text-[16px] font-medium">Author</span>}>
                     {author}
                  </Descriptions.Item>
                  <Descriptions.Item label={<span className="text-dark text-[16px] font-medium">Year</span>}>
                     {publicationYear}
                  </Descriptions.Item>
                  <Descriptions.Item label={<span className="text-dark text-[16px] font-medium">Publisher</span>}>
                     {publishingHouse.name} ({publishingHouse.city})
                  </Descriptions.Item>
               </Descriptions>
               <p className="mt-5">{book.description}</p>
            </div>
         </div>
      </Col>
   )
}
}

export default BookPage
