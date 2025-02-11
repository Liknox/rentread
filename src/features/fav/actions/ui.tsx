import { Button } from "antd"
import { HeartOutlined, HeartFilled } from "@ant-design/icons"
import { bookModel } from "entities/book"
import { alert } from "@shared/lib"
import { viewerModel } from "entities/viewer"

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
   const { handleToggle, isBookFav } = useToggleBook(bookId)

   const Icon = isBookFav ? HeartFilled : HeartOutlined
   return (
      <Button className="rounded-sm" block icon={<Icon />} onClick={handleToggle}>
         {isBookFav ? "Remove from Favorites" : "Add to Favorites"}
      </Button>
   )
}
