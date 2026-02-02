import { ClockCircleFilled, ClockCircleOutlined } from "@ant-design/icons"
import { useRouter } from "@tanstack/react-router"
import { Button } from "antd"
import { useTranslation } from "react-i18next"

import { ROUTES } from "@app/configs/constants"
import { TRANSLATIONS } from "@app/configs/constants/translation"
import { alert } from "@shared/lib"
import { bookModel } from "entities/book"
import { orderModel } from "entities/order"

type Props = {
  bookId: number
}

const useToggleBook = (bookId: number) => {
  const { t } = useTranslation()
  const router = useRouter()
  const isBookReserved = orderModel.useBookReservationStatus(bookId)
  const book = bookModel.useBook(bookId)
  const reserve = orderModel.useReserveStore()

  const handleToggle = () => {
    const action = isBookReserved ? TRANSLATIONS.alert.reserve.remove : TRANSLATIONS.alert.reserve.add
    alert.info(
      `${book?.name}`,
      <p onClick={() => router.navigate({ to: ROUTES.PROFILE_RESERVED })} className="text-primary cursor-pointer">
        {t(action)}
      </p>,
      <ClockCircleOutlined />,
    )
    reserve.toggleBook(bookId)
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
