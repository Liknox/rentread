import { ShoppingFilled, ShoppingOutlined } from "@ant-design/icons"
import { alert } from "@shared/lib"
import { Button } from "antd"
import { bookModel } from "entities/book"
import { orderModel } from "entities/order"

type Props = {
   bookId: number
   disabled?: boolean
}

const useToggleBook = ({ bookId, disabled }: Props) => {
   const { isBookInCart } = orderModel.cart.useBookStatus(bookId)
   const book = bookModel.useBook(bookId)

   const handleToggle = () => {
      if (disabled) return
      const action = isBookInCart ? "Removed from cart" : "Added to cart"
      alert.info(
         `${book?.name}`,
         <a href="/order" className="text-primary">
            {action}
         </a>,
         <ShoppingOutlined />,
      )
      orderModel.cart.events.toggleBook(bookId)
   }

   return { handleToggle, isBookInCart }
}

export const AddBook = (props: Props) => {
   const { handleToggle, isBookInCart } = useToggleBook(props)
   const { disabled } = props

   const Icon = isBookInCart ? ShoppingFilled : ShoppingOutlined
   return (
      <Button className="rounded-sm" type="primary" icon={<Icon />} onClick={handleToggle} block disabled={disabled}>
         {isBookInCart ? "Remove from cart" : "Add to cart"}
      </Button>
   )
}
