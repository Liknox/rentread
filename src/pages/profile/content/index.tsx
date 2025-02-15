import { CheckCircleOutlined, ClockCircleOutlined, HeartOutlined, ShoppingOutlined } from "@ant-design/icons"
import { TOPIC_HISTORY, TOPIC_FAV, TOPIC_OPENED, TOPIC_RESERVED } from "@app/configs/constants"
import { useRouter } from "@tanstack/react-router"
import { Layout } from "antd"
import { viewerLib, viewerModel } from "entities/viewer"
import { Cart } from "features/cart"
import { Fav } from "features/fav"
import { useEffect } from "react"
import { Section } from "./section"

export const Content = () => {
   const viewerNrml = viewerModel.useViewerNormalized()
   const favBooks = viewerModel.useFavBooks()

   const router = useRouter()
   const currentAnchor = router.state.location.hash

   useEffect(() => {
      setTimeout(() => {
         const element = document.getElementById(currentAnchor)
         if (element) {
            element.scrollIntoView({ behavior: "smooth" })
         }
      }, 20)
   }, [currentAnchor])

   return (
      <Layout className="mx-5">
         <Section
            id={TOPIC_OPENED.id}
            title={TOPIC_OPENED.fullTitle}
            description={TOPIC_OPENED.description}
            books={viewerNrml.openedBooks.slice().reverse()}
            Icon={ShoppingOutlined}
            active={TOPIC_OPENED.id === currentAnchor}
            renderBookDetails={(_, idx) => {
               const order = viewerNrml.opened[idx]
               return viewerLib.getOrderInfo(order)
            }}
         />
         <Section
            id={TOPIC_RESERVED.id}
            title={TOPIC_RESERVED.fullTitle}
            description={TOPIC_RESERVED.description}
            books={viewerNrml.reservedBooks}
            Icon={ClockCircleOutlined}
            active={TOPIC_RESERVED.id === currentAnchor}
            getRibbonProps={(_, idx) => {
               const reserve = viewerLib.getReservationInfo(viewerNrml.reserved[idx])

               if (reserve.couldBeRent) {
                  return { color: "orange", text: "It's your turn!" }
               }
               return {
                  color: "lightslategray",
                  text: `Your number in queue: ${reserve.queryIdx + 1}`,
               }
            }}
            renderBookDetails={(_, idx) => {
               const reserve = viewerLib.getReservationInfo(viewerNrml.reserved[idx])

               if (reserve.couldBeRent) {
                  return <p>Place your order within two days to keep your spot in the queue.</p>
               }
               return (
                  <span>
                     Waiting time: ~ <b>{`${reserve.awaitTime} ${reserve.awaitTime > 1 ? "days" : "day"}`}</b>
                  </span>
               )
            }}
            renderBookActions={(b, idx) => {
               const reserve = viewerLib.getReservationInfo(viewerNrml.reserved[idx])
               return [<Cart.Actions.AddBookMini key="cart" bookId={b.id} disabled={!reserve.couldBeRent} />]
            }}
         />
         <Section
            id={TOPIC_FAV.id}
            title={TOPIC_FAV.fullTitle}
            description={TOPIC_FAV.description}
            books={favBooks}
            Icon={HeartOutlined}
            active={TOPIC_FAV.id === currentAnchor}
            renderBookActions={b => [<Fav.Actions.AddBookMini key="fav" bookId={b.id} />]}
         />
         <Section
            id={TOPIC_HISTORY.id}
            title={TOPIC_HISTORY.fullTitle}
            description={TOPIC_HISTORY.description}
            books={viewerNrml.closedBooks}
            Icon={CheckCircleOutlined}
            active={TOPIC_HISTORY.id === currentAnchor}
         />
      </Layout>
   )
}
