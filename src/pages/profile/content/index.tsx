import { CheckCircleOutlined, ClockCircleOutlined, HeartOutlined, ShoppingOutlined } from "@ant-design/icons"
import { useRouter } from "@tanstack/react-router"
import { Layout } from "antd"
import { useTranslation } from "react-i18next"

import { TOPIC_FAV, TOPIC_HISTORY, TOPIC_OPENED, TOPIC_RESERVED } from "@app/configs/constants"
import { TRANSLATIONS } from "@app/configs/constants/translation"
import { viewerLib, viewerModel } from "entities/viewer"
import { Cart } from "features/cart"
import { Fav } from "features/fav"
import { Section } from "./section"

export const Content = () => {
  const { t } = useTranslation()
  const viewerNrml = viewerModel.useViewerNormalized()
  const favBooks = viewerModel.useFavBooks()

  const router = useRouter()
  const currentAnchor = router.state.location.hash

  return (
    <Layout className="mx-0 md:mx-5 mt-5 md:mt-0 !w-full">
      <Section
        id={TOPIC_OPENED.id}
        title={t(TOPIC_OPENED.fullTitle)}
        description={t(TOPIC_OPENED.description)}
        books={viewerNrml.openedBooks.slice().reverse()}
        Icon={ShoppingOutlined}
        active={TOPIC_OPENED.id === currentAnchor}
        renderBookDetails={(_, idx) => {
          const order = viewerNrml.opened[idx]
          return viewerLib.useOrderInfo(order)
        }}
      />
      <Section
        id={TOPIC_RESERVED.id}
        title={t(TOPIC_RESERVED.fullTitle)}
        description={t(TOPIC_RESERVED.description)}
        books={viewerNrml.reservedBooks}
        Icon={ClockCircleOutlined}
        active={TOPIC_RESERVED.id === currentAnchor}
        getRibbonProps={(_, idx) => {
          const reserve = viewerLib.getReservationInfo(viewerNrml.reserved[idx])

          if (reserve.couldBeRent) {
            return { color: "orange", text: t(TRANSLATIONS.timezone.yourTurn) }
          }
          return {
            color: "lightslategray",
            text: `${t(TRANSLATIONS.timezone.yourQueue)} ${reserve.queryIdx + 1}`,
          }
        }}
        renderBookDetails={(_, idx) => {
          const reserve = viewerLib.getReservationInfo(viewerNrml.reserved[idx])
          if (reserve.couldBeRent) {
            return <p>{t(TRANSLATIONS.timezone.couldBeRent)}</p>
          }
          return (
            <span>
              {t(TRANSLATIONS.timezone.waitingTime)}{" "}
              <b>{`${reserve.awaitTime} ${t(reserve.awaitTime > 1 ? (reserve.awaitTime >= 2 && reserve.awaitTime < 5 ? TRANSLATIONS.timezone.days : TRANSLATIONS.timezone.dayss) : TRANSLATIONS.timezone.day)}`}</b>
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
        title={t(TOPIC_FAV.fullTitle)}
        description={t(TOPIC_FAV.description)}
        books={favBooks}
        Icon={HeartOutlined}
        active={TOPIC_FAV.id === currentAnchor}
        renderBookActions={b => [<Fav.Actions.AddBookMini key="fav" bookId={b.id} />]}
      />
      <Section
        id={TOPIC_HISTORY.id}
        title={t(TOPIC_HISTORY.fullTitle)}
        description={t(TOPIC_HISTORY.description)}
        books={viewerNrml.closedBooks}
        Icon={CheckCircleOutlined}
        active={TOPIC_HISTORY.id === currentAnchor}
      />
    </Layout>
  )
}
