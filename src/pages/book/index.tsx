import { BookFilled, HistoryOutlined, InboxOutlined } from "@ant-design/icons"
import { type AbstractBook, fakeApi } from "@shared/api"
import { alert } from "@shared/lib"
import { Link, useMatch } from "@tanstack/react-router"
import { Button, Carousel, Col, Descriptions, Layout, Result, Row, Typography } from "antd"
import { BookCard } from "entities/book"
import { orderLib } from "entities/order"
import { TariffRadio } from "entities/tariff"
import { Cart } from "features/cart"
import { Fav } from "features/fav"
import { Reserve } from "features/reserve"

function BookPage() {
   // FIXME: add skeleton template
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
            <Checkout book={book} />
         </Row>
         <Row>
            <Recommendations book={book} />
         </Row>
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
               <Carousel autoplay autoplaySpeed={3000} className="dark-slick-dots">
                  <div className="h-[640px] text-[300px] text-center select-none bg-[var(--color-accent)]">
                     <BookFilled style={{ marginTop: 150 }} />
                  </div>
                  <div className="h-[640px] text-[300px] text-center select-none bg-[var(--color-accent)]">
                     <BookFilled style={{ marginTop: 150, color: "royalblue" }} />
                  </div>
                  <div className="h-[640px] text-[300px] text-center select-none bg-[var(--color-accent)]">
                     <BookFilled style={{ marginTop: 150, color: "goldenrod" }} />
                  </div>
                  <div className="h-[640px] text-[300px] text-center select-none bg-[var(--color-accent)]">
                     <BookFilled style={{ marginTop: 150, color: "red" }} />
                  </div>
                  <div className="h-[640px] text-[300px] text-center select-none bg-[var(--color-accent)]">
                     <BookFilled style={{ marginTop: 150, color: "limegreen" }} />
                  </div>
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

const Checkout = ({ book }: BookProps) => {
   const rent = orderLib.getRentInfo(book.id)
   const style = rent.status !== "RENTABLE" ? { opacity: 0.5 } : {}
   const price = `${fakeApi.library.books.getPrice(book)} $`
   console.debug("BOOK RENT", book.id, rent)

   return (
      <Col span={7} offset={1} style={style}>
         <article className="flex flex-col justify-between min-h-[300px] p-7 shadow-insetDark">
            <div>
               <h3 className="text-[40px] font-medium mt-2">
                  {rent.status === "RENTABLE" && price}
                  {rent.status === "RESERVABLE" && "You can reserve"}
                  {rent.status === "OUT_STOCK" && "Out of stock"}
               </h3>
               {/* FIXME: inline style */}
               <Row style={{ marginTop: 20 }}>
                  {rent.status === "RENTABLE" && (
                     <ul className="text-darkGray">
                        <li className="mt-2">
                           <InboxOutlined /> Delivery by courier service within 2 days.
                        </li>
                        <li className="mt-2">
                           <HistoryOutlined /> For rent until {/* FIXME: hardcoded, use entities/tariffs */}
                           {Math.min(30, rent.duration)}
                           {rent.duration === 1 ? "day" : "days"}
                        </li>
                     </ul>
                  )}
                  {rent.status === "RESERVABLE" && (
                     <>
                        <p>At the moment, all copies of this book are taken.</p>
                        <p>
                           You can place a reservation on it to rent it once it becomes available and your turn comes.
                        </p>
                     </>
                  )}
                  {rent.status === "OUT_STOCK" && (
                     <>
                        <p>At the moment, there are no copies of this book from users in the service.</p>
                        <p>
                           You can place a reservation on it to rent it once it becomes available and your turn comes,
                           or add it to your favorites.
                        </p>
                     </>
                  )}
               </Row>
            </div>
            {/* FIXME: action button style */}
            <div className="mt-5">
               <Fav.Actions.AddBook bookId={book.id} />
               {rent.status === "RENTABLE" && <Cart.Actions.AddBook bookId={book.id} />}
               {rent.status === "RESERVABLE" && <Reserve.Actions.ReserveBook bookId={book.id} />}
               {rent.status === "OUT_STOCK" && <Reserve.Actions.ReserveBook bookId={book.id} />}
               {/* FIXME: display tarrif rent buttons */}
               {false && <TariffRadio onChange={e => alert.info(String(e))} withTitle={false} disabled />}
            </div>
         </article>
      </Col>
   )
}

const Recommendations = ({ book }: BookProps) => {
   const booksQuery = fakeApi.library.books
      .getList({ filters: { authors: book.authors.map(a => a.id) } })
      .filter(b => b.id !== book.id)

   if (!booksQuery.length) return null

   return (
      <Col span={16}>
         <h1 className="text-[20px] font-medium">By the same author</h1>
         <Row className="pb-5 mt-5 overflow-auto" wrap={false} gutter={[20, 0]}>
            {booksQuery.map(b => (
               <Col key={b.id} span={8}>
                  <BookCard data={b} size="small" />
               </Col>
            ))}
         </Row>
      </Col>
   )
}

export default BookPage
