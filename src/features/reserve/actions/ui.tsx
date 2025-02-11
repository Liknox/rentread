import { ClockCircleFilled, ClockCircleOutlined } from "@ant-design/icons"
import { alert } from "@shared/lib"
import { Button } from "antd"
import { bookModel } from "entities/book"
import { orderModel } from "entities/order"

type Props = {
   bookId: number
}

const useToggleBook = (bookId: number) => {
   // FIXME: replace to reservationModel
   const { isBookReserved } = orderModel.reservation.useBookReservationStatus(bookId)
   // const isBookReserved = Boolean((book?.name.length || 0) % 2);
   const book = bookModel.useBook(bookId)

   const handleToggle = () => {
      const action = isBookReserved ? "Reservation canceled" : "Successfully reserved"
      alert.info(
         `${book?.name}`,
         <a href="/profile#reserved" className="text-primary">
            {action}
         </a>,
         <ClockCircleOutlined />,
      )
      orderModel.reservation.events.toggleBook(bookId)
   }

   return { handleToggle, isBookReserved }
}

export const ReserveBook = ({ bookId }: Props) => {
   const { handleToggle, isBookReserved } = useToggleBook(bookId)

   const Icon = isBookReserved ? ClockCircleFilled : ClockCircleOutlined
   return (
      <Button block icon={<Icon />} onClick={handleToggle} type="dashed">
         {isBookReserved ? "Cancel reservation" : "Reserve"}
      </Button>
   )
}

export const ReserveBookMini = ({ bookId }: Props) => {
   const { handleToggle, isBookReserved } = useToggleBook(bookId)

   const Icon = isBookReserved ? ClockCircleFilled : ClockCircleOutlined
   return <Icon style={{ fontSize: 20 }} onClick={handleToggle} />
}
