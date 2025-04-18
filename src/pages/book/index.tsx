import { BookFilled, HistoryOutlined, InboxOutlined } from "@ant-design/icons"
import { Link, useMatch } from "@tanstack/react-router"
import { Button, Carousel, Col, Descriptions, Layout, Result, Row, Tooltip, Typography } from "antd"
import cn from "classnames"
import { useTranslation } from "react-i18next"

import { CAROUSEL_TIMER, routes } from "@app/configs/constants"
import { TRANSLATIONS } from "@app/configs/constants/translation"
import { type AbstractBook, fakeApi } from "@shared/api"
import { useMobileDetection } from "@shared/lib/browser"
import { BookCard } from "entities/book"
import { orderLib, orderModel } from "entities/order"
import { TariffRadio } from "entities/tariff"
import { Cart } from "features/cart"
import { Fav } from "features/fav"
import { Reserve } from "features/reserve"

function BookPage() {
   // FIXME: add skeleton template
   const { t } = useTranslation()
   const { params } = useMatch({ from: "/book/$bookId" }) as { params: { bookId: string } }
   const isMobile = useMobileDetection()

   const bookId = Number(params?.bookId)
   const book = fakeApi.library.books.getById(bookId)

   if (!book) {
      return (
         <Layout.Content className="flex justify-center items-center">
            <Result
               status="404"
               title="404"
               subTitle={t(TRANSLATIONS.book.bookNotFound)}
               extra={<Button href="/catalog">{t(TRANSLATIONS.order.result.toCatalog)}</Button>}
            />
         </Layout.Content>
      )
   }

   return (
      <Layout.Content className="md:mb-20">
         <Link to={routes.CATALOG} className="font-roboto text-primary">
            {t(TRANSLATIONS.book.breadcrumbs)}
         </Link>
         <Typography.Title level={isMobile ? 3 : 2}>{fakeApi.library.books.getBookString(book)}</Typography.Title>
         <Row className="mt-8 mb-20 flex flex-col md:flex-row">
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

type CarouselColor = {
   id: number
   color: string
}

const carousel: CarouselColor[] = [
   { id: 1, color: "" },
   { id: 2, color: "royalblue" },
   { id: 3, color: "goldenrod" },
   { id: 4, color: "red" },
   { id: 5, color: "limegreen" },
]

const Card = ({ book }: BookProps) => {
   const { t } = useTranslation()
   const { authors, publicationYear, publishingHouse } = book
   const author = authors.map(fakeApi.library.authors.getShortname).join(", ")
   const isMobile = useMobileDetection()

   return (
      <Col span={isMobile ? "full" : 16}>
         <div className="flex flex-col md:flex-row">
            <div className="md:w-[450px]">
               <Carousel autoplay autoplaySpeed={CAROUSEL_TIMER} className="dark-slick-dots">
                  {carousel.map(cover => (
                     <div
                        key={cover.id}
                        className={cn("h-[640px] text-[300px] text-center select-none bg-[var(--color-accent)]", {
                           "!h-[440px] !text-[270px]": isMobile,
                        })}>
                        <BookFilled className="md:mt-40" style={{ color: cover.color }} />
                     </div>
                  ))}
               </Carousel>
            </div>
            <div className="mt-7 ml-0 md:mt-0 md:ml-10">
               <Descriptions
                  title={<span className="font-roboto text-[25px]">{t(TRANSLATIONS.book.about)}</span>}
                  column={1}
                  styles={{ content: { fontSize: 16 } }}>
                  <Descriptions.Item
                     label={<span className="text-dark text-[16px] font-bold">{t(TRANSLATIONS.book.author)}</span>}>
                     {author}
                  </Descriptions.Item>
                  <Descriptions.Item
                     label={<span className="text-dark text-[16px] font-bold">{t(TRANSLATIONS.book.year)}</span>}>
                     {publicationYear}
                  </Descriptions.Item>
                  <Descriptions.Item
                     label={<span className="text-dark text-[16px] font-bold">{t(TRANSLATIONS.book.publisher)}</span>}>
                     {publishingHouse.name} ({publishingHouse.city})
                  </Descriptions.Item>
               </Descriptions>
               <p className="mt-5">
                  <Tooltip title={t(TRANSLATIONS.book.descrTooltip)} trigger="click">
                     {book.description}
                  </Tooltip>
               </p>
            </div>
         </div>
      </Col>
   )
}

const Checkout = ({ book }: BookProps) => {
   const { t } = useTranslation()
   const rent = orderLib.getRentInfo(book.id)
   const style = rent.status !== "RENTABLE" ? { opacity: 0.5 } : {}
   const price = `${fakeApi.library.books.getPrice(book)} $`
   const durations = orderModel.useOrderDurations()
   const cartDurations = orderModel.useDurationsStore()
   const isMobile = useMobileDetection()

   console.debug("BOOK RENT", book.id, rent)

   const handleTariffChange = (value: number) => {
      if (rent.status === "RENTABLE") {
         cartDurations.setBookDuration(book.id, value)
      }
   }

   return (
      <Col span={isMobile ? "full" : 7} offset={1} style={style} className="ml-0 md:ml-12 mt-10 md:mt-0">
         <article className="flex flex-col justify-between min-h-[300px] p-7 shadow-insetDark">
            <div>
               <h3 className="text-[40px] font-medium md:mt-2">
                  <Tooltip title={t(TRANSLATIONS.book.tooltip)} trigger="click">
                     {rent.status === "RENTABLE" && price}
                  </Tooltip>
                  {rent.status === "RESERVABLE" && t(TRANSLATIONS.book.reservable.title)}
                  {rent.status === "OUT_STOCK" && t(TRANSLATIONS.book.outOfStock.title)}
               </h3>
               <Row className="mt-3">
                  {rent.status === "RENTABLE" && (
                     <ul className="text-darkGray">
                        <li className="mt-2">
                           <InboxOutlined /> {t(TRANSLATIONS.book.deliveryByCourier)}
                        </li>
                        <li className="mt-2">
                           <HistoryOutlined /> {t(TRANSLATIONS.book.forRent)} {Math.min(30, rent.duration)}{" "}
                           {t(
                              rent.duration > 1
                                 ? rent.duration >= 2 && rent.duration < 5
                                    ? TRANSLATIONS.timezone.days
                                    : TRANSLATIONS.timezone.dayss
                                 : TRANSLATIONS.timezone.day,
                           )}
                        </li>
                     </ul>
                  )}
                  {rent.status === "RESERVABLE" && (
                     <>
                        <p>{t(TRANSLATIONS.book.reservable.subtitle)}</p>
                        <p>{t(TRANSLATIONS.book.reservable.description)}</p>
                     </>
                  )}
                  {rent.status === "OUT_STOCK" && (
                     <>
                        <p>{t(TRANSLATIONS.book.outOfStock.subtitle)}</p>
                        <p>{t(TRANSLATIONS.book.outOfStock.description)}</p>
                     </>
                  )}
               </Row>
            </div>
            {/* FIXME: action button style */}
            <div className="mt-6 md:mt-10 w-full md:w-[300px] gap-2 m-auto">
               {
                  <TariffRadio
                     onChange={handleTariffChange}
                     value={rent.status === "RENTABLE" ? durations[book.id] || 7 : 0}
                     withTitle={false}
                     __byDuration={rent.status === "RENTABLE" ? rent.duration : undefined}
                  />
               }
               <div className="mt-5">
                  <Fav.Actions.AddBook bookId={book.id} />
                  {rent.status === "RENTABLE" && <Cart.Actions.AddBook bookId={book.id} />}
                  {rent.status === "RESERVABLE" && <Reserve.Actions.ReserveBook bookId={book.id} />}
                  {rent.status === "OUT_STOCK" && <Reserve.Actions.ReserveBook bookId={book.id} />}
               </div>
            </div>
         </article>
      </Col>
   )
}

const Recommendations = ({ book }: BookProps) => {
   const { t } = useTranslation()
   const booksQuery = fakeApi.library.books
      .getList({ filters: { authors: book.authors.map(a => a.id) } })
      .filter(b => b.id !== book.id)
   const isMobile = useMobileDetection()

   if (!booksQuery.length) return null

   return (
      <Col span={isMobile ? "full" : 16}>
         <h1 className="font-roboto text-[26px] font-medium">{t(TRANSLATIONS.book.sameAuthor)}</h1>
         <Row className="pb-5 mt-5 overflow-auto" wrap={false} gutter={[20, 0]}>
            {booksQuery.map(b => (
               <Col key={b.id} span={8} className="min-w-full md:min-w-[315px]">
                  <BookCard data={b} size="small" />
               </Col>
            ))}
         </Row>
      </Col>
   )
}

export default BookPage
