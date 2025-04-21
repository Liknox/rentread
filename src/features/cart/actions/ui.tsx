import { ShoppingFilled, ShoppingOutlined } from "@ant-design/icons"
import { useRouter } from "@tanstack/react-router"
import { Button, Modal } from "antd"
import type { CSSProperties } from "react"
import { useTranslation } from "react-i18next"

import { ROUTES } from "@app/configs/constants"
import { TRANSLATIONS } from "@app/configs/constants/translation"
import { alert } from "@shared/lib"
import { bookModel } from "entities/book"
import { orderModel } from "entities/order"

type Props = {
   bookId: number
   disabled?: boolean
}

const useToggleBook = ({ bookId, disabled }: Props) => {
   const { t } = useTranslation()
   const router = useRouter()
   const isBookInCart = orderModel.useBookStatus(bookId)
   const book = bookModel.useBook(bookId)
   const cartBooks = orderModel.useCartBooksStore()
   const cartDurations = orderModel.useDurationsStore()

   const handleToggle = () => {
      if (disabled) return
      const action = isBookInCart ? TRANSLATIONS.alert.cart.remove : TRANSLATIONS.alert.cart.add
      alert.info(
         `${book?.name}`,
         <p onClick={() => router.navigate({ to: ROUTES.ORDER })} className="text-primary cursor-pointer">
            {t(action)}
         </p>,
         <ShoppingOutlined />,
      )
      cartBooks.toggleBook(bookId)
      cartDurations.toggleBook(bookId)
   }

   return { handleToggle, isBookInCart }
}

export const AddBook = (props: Props) => {
   const { t } = useTranslation()
   const { handleToggle, isBookInCart } = useToggleBook(props)
   const { disabled } = props

   const Icon = isBookInCart ? ShoppingFilled : ShoppingOutlined
   return (
      <Button className="rounded-sm" type="primary" icon={<Icon />} onClick={handleToggle} block disabled={disabled}>
         {t(isBookInCart ? TRANSLATIONS.actions.cart.removeText : TRANSLATIONS.actions.cart.addText)}
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
   const { t } = useTranslation()
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
               title: t(TRANSLATIONS.actions.modal.title),
               icon: <ShoppingFilled />,
               content: t(TRANSLATIONS.actions.modal.description),
               okText: t(TRANSLATIONS.actions.modal.yes),
               cancelText: t(TRANSLATIONS.actions.modal.no),
               okType: "danger",
               onOk() {
                  handleToggle()
               },
            })
         }
         block
         disabled={disabled}>
         {t(TRANSLATIONS.actions.remove)}
      </Button>
   )
}
