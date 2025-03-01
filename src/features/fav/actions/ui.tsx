import { HeartFilled, HeartOutlined } from "@ant-design/icons"
import { TRANSLATIONS } from "@app/configs/constants/translation"
import { alert } from "@shared/lib"
import { isMobile } from "@shared/lib/browser"
import { Button } from "antd"
import { bookModel } from "entities/book"
import { viewerModel } from "entities/viewer"
import { useTranslation } from "react-i18next"

type Props = {
   bookId: number
}

const useToggleBook = (bookId: number) => {
   const { isBookFav } = viewerModel.useBookFavStatus(bookId)
   const book = bookModel.useBook(bookId)

   const handleToggle = () => {
      const action = isBookFav ? "Removed from Favorites" : "Added to Favorites"

      alert.info(
         `${book?.name}`,
         <a href="/profile#fav" className="text-primary">
            {action}
         </a>,
         <HeartOutlined />,
      )
      viewerModel.events.toggleBook(bookId)
   }

   return { handleToggle, isBookFav }
}

export const AddBook = ({ bookId }: Props) => {
   const { t } = useTranslation()
   const { handleToggle, isBookFav } = useToggleBook(bookId)

   const Icon = isBookFav ? HeartFilled : HeartOutlined
   const text = isBookFav
      ? isMobile
         ? TRANSLATIONS.actions.favorites.removeText
         : TRANSLATIONS.actions.favorites.removeText2
      : TRANSLATIONS.actions.favorites.addText

   return (
      <Button className="rounded-sm mr-3 md:mr-0" block icon={<Icon />} onClick={handleToggle}>
         {t(text)}
      </Button>
   )
}

export const AddBookMini = ({ bookId }: Props) => {
   const { handleToggle, isBookFav } = useToggleBook(bookId)

   const Icon = isBookFav ? HeartFilled : HeartOutlined
   return <Icon className="!text-[20px] mb-1" onClick={handleToggle} />
}
