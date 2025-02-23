import { routes } from "@app/configs/constants"
import { useRouter } from "@tanstack/react-router"
import { Col, Row, Typography } from "antd"
import { fakeApi } from "shared/api"
import imgCat1 from "./assets/c1.jpg"
import imgCat2 from "./assets/c2.jpg"
import imgCat3 from "./assets/c3.jpg"

const srcCategoriesMap: Record<number, string> = {
   1: imgCat1,
   2: imgCat2,
   3: imgCat3,
}

const Categories = () => {
   const categoriesQuery = fakeApi.library.categories.getAll()
   const router = useRouter()

   const category = "cat"

   return (
      <Row justify="space-between" className="sm:flex sm:flex-row flex-col">
         {categoriesQuery.map(cat => (
            <Col
               key={cat.id}
               className="2xl:min-w-[390px] hover:opacity-80 hover:scale-[1.01] transition-[0.25s] relative h-[292px] !important p-10 overflow-hidden text-center cursor-pointer bg-[var(--color-accent)] rounded-[10px] max-w-none mt-3 sm:mt-0 min-h-52"
               span={7}
               onClick={() => router.navigate({ to: `${routes.CATALOG}?${category}=${cat.id}` })}
               title="Go to books by category">
               <div className="absolute top-1/2 left-1/2 z-10 text-white !important transform -translate-x-1/2 -translate-y-1/2 min-w-[180px]">
                  <Typography.Title className="!text-white" level={3}>
                     {cat.name}
                  </Typography.Title>
                  <Typography.Text className="text-white">{cat.description}</Typography.Text>
               </div>
               <div className="absolute bottom-[-100px] left-1/2 text-[200px] transform -translate-x-1/2">
                  <img className="brightness-[0.3] bg-cover max-w-max" src={srcCategoriesMap[cat.id]} alt="book logo" />
                  {/* <BookFilled {...cat.cover} /> */}
               </div>
            </Col>
         ))}
      </Row>
   )
}

export { Categories }
