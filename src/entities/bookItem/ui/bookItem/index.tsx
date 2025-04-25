import { TRANSLATIONS } from "@app/configs/constants/translation"
import { AbstractBook } from "@shared/api"
import { catalogParams } from "@shared/lib"
import { useMobileDetection } from "@shared/lib/browser"
import { Badge, Col, Typography } from "antd"
import { BookCard, BookRowCard } from "entities/book/ui"
import { orderLib } from "entities/order"
import { TariffRadio } from "entities/tariff"
import { Cart } from "features/cart"
import { Fav } from "features/fav"
import { Reserve } from "features/reserve"
import { motion } from "framer-motion"
import { ForwardedRef, forwardRef } from "react"
import { useTranslation } from "react-i18next"

const ribbonPropsTypes = {
   RESERVABLE: {
      text: TRANSLATIONS.catalog.ribbon.notAvailable,
      color: "gray",
      isVisible: true,
   },
   OUT_STOCK: {
      text: TRANSLATIONS.catalog.ribbon.popular,
      color: "magenta",
      isVisible: true,
   },
   RENTABLE: {
      text: "",
      color: "",
      isVisible: false,
   },
}

const BookItem = motion(
   forwardRef(({ data }: { data: AbstractBook }, ref: ForwardedRef<HTMLDivElement>) => {
      const { t } = useTranslation()
      const vtParam = catalogParams.useViewType()
      const rent = orderLib.getRentInfo(data.id)
      const ribbon = ribbonPropsTypes[rent.status]
      const span = vtParam.isGrid ? 8 : 24
      const isMobile = useMobileDetection()

      return (
         <Col span={span} ref={ref} className="mt-4 md:mt-0 !p-0 md:!p-2" aria-label="book column">
            <Badge.Ribbon
               text={t(ribbon.text)}
               color={ribbon.color}
               style={ribbon.isVisible ? undefined : { display: "none" }}
               aria-label="ribbon">
               {vtParam.isGrid && (
                  <BookCard
                     data={data}
                     asSecondary={rent.status === "RESERVABLE"}
                     actions={[
                        <Fav.Actions.AddBookMini key="fav" bookId={data.id} aria-label="add to favorites" />,
                        rent.status === "RENTABLE" && (
                           <Cart.Actions.AddBookMini key="order" bookId={data.id} aria-label="add to cart" />
                        ),
                        rent.status === "RESERVABLE" && (
                           <Reserve.Actions.ReserveBookMini key="reserve" bookId={data.id} aria-label="reserve" />
                        ),
                     ].filter(Boolean)}>
                     <br />
                     <Typography.Text type="secondary">
                        {rent.status === "RENTABLE" && (
                           <span>
                              {t(TRANSLATIONS.timezone.forRent)} {Math.min(30, rent.duration)}{" "}
                              {t(TRANSLATIONS.timezone.dayss)}
                           </span>
                        )}
                     </Typography.Text>
                  </BookCard>
               )}
               {vtParam.isList && (
                  <BookRowCard
                     data={data}
                     asSecondary={rent.status === "RESERVABLE"}
                     size={isMobile ? "default" : "large"}
                     actions={
                        <>
                           <Fav.Actions.AddBook bookId={data.id} aria-label="add to favorites" />
                           {rent.status === "RENTABLE" && (
                              <Cart.Actions.AddBook bookId={data.id} aria-label="add to cart" />
                           )}
                           {rent.status === "RESERVABLE" && (
                              <Reserve.Actions.ReserveBook bookId={data.id} aria-label="reserve" />
                           )}
                           {rent.status !== "RESERVABLE" && !isMobile ? (
                              <TariffRadio __byDuration={rent.duration} disabled aria-label="tariff radio" />
                           ) : null}
                        </>
                     }
                  />
               )}
            </Badge.Ribbon>
         </Col>
      )
   }),
)

export { BookItem }
