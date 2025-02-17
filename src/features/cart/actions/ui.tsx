import { ShoppingFilled, ShoppingOutlined } from "@ant-design/icons"
import { alert } from "@shared/lib"
import { Button, Modal } from "antd"
import { bookModel } from "entities/book"
import { orderModel } from "entities/order"
import type { CSSProperties } from "react"

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

export const AddBookMini = (props: Props) => {
   const { handleToggle, isBookInCart } = useToggleBook(props)
   const { disabled } = props

   const Icon = isBookInCart ? ShoppingFilled : ShoppingOutlined
   const disabledStyles: CSSProperties = disabled ? { opacity: 0.25, cursor: "not-allowed" } : {}

   return (
      <Icon className="!text-[20px] mb-1" style={{ ...disabledStyles }} onClick={handleToggle} disabled={disabled} />
   )
}

export const DeleteBook = (props: Props) => {
   const { handleToggle } = useToggleBook(props)
   const { disabled } = props

   return (
      <Button
         type="default"
         ghost
         danger
         icon={<ShoppingFilled />}
         onClick={() =>
            Modal.confirm({
               title: "Are you sure you want to remove the book from the order?",
               icon: <ShoppingFilled />,
               content: "This action cannot be undone.",
               okText: "Yes",
               cancelText: "No",
               okType: "danger",
               onOk() {
                  handleToggle()
               },
            })
         }
         block
         disabled={disabled}>
         Remove
      </Button>
   )
}
