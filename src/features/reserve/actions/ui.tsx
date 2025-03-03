import { ClockCircleFilled, ClockCircleOutlined } from "@ant-design/icons"
import { TRANSLATIONS } from "@app/configs/constants/translation"
import { alert } from "@shared/lib"
import { Button } from "antd"
import { bookModel } from "entities/book"
import { orderModel } from "entities/order"
import { useTranslation } from "react-i18next"

type Props = {
   bookId: number
}

const useToggleBook = (bookId: number) => {
   // FIXME: replace to reservationModel
   const { t } = useTranslation()
   const { isBookReserved } = orderModel.reservation.useBookReservationStatus(bookId)
   // const isBookReserved = Boolean((book?.name.length || 0) % 2);
   const book = bookModel.useBook(bookId)

   const handleToggle = () => {
      const action = isBookReserved ? TRANSLATIONS.alert.reserve.remove : TRANSLATIONS.alert.reserve.add
      alert.info(
         `${book?.name}`,
         <a href="/profile#reserved" className="text-primary">
            {t(action)}
         </a>,
         <ClockCircleOutlined />,
      )
      orderModel.reservation.events.toggleBook(bookId)
   }

   return { handleToggle, isBookReserved }
}

export const ReserveBook = ({ bookId }: Props) => {
   const { t } = useTranslation()
   const { handleToggle, isBookReserved } = useToggleBook(bookId)

   const Icon = isBookReserved ? ClockCircleFilled : ClockCircleOutlined
   return (
      <Button block icon={<Icon />} onClick={handleToggle} type="dashed">
         {t(isBookReserved ? TRANSLATIONS.actions.reservation.removeText : TRANSLATIONS.actions.reservation.addText)}
      </Button>
   )
}

export const ReserveBookMini = ({ bookId }: Props) => {
   const { handleToggle, isBookReserved } = useToggleBook(bookId)

   const Icon = isBookReserved ? ClockCircleFilled : ClockCircleOutlined
   return <Icon className="!text-[20px] mb-1" onClick={handleToggle} />
}
