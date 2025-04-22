import { useRouter } from "@tanstack/react-router"
import { Col, Row, Typography, Skeleton } from "antd"
import { useEffect, useState } from "react"

import { ROUTES, SKELETON_DELAY } from "@app/configs/constants"
import { fakeApi } from "shared/api"
import type { Category } from "shared/api"
import { loadingState } from "@shared/lib/skeleton/loadingState"

import imgCat1 from "./assets/c1.webp"
import imgCat2 from "./assets/c2.webp"
import imgCat3 from "./assets/c3.webp"

const srcCategoriesMap: Record<number, string> = {
   1: imgCat1,
   2: imgCat2,
   3: imgCat3,
}

const Categories = () => {
   const [isLoading, setIsLoading] = useState(true)
   const [categories, setCategories] = useState<Category[]>([])
   const router = useRouter()

   useEffect(() => {
      if (loadingState.hasLoaded("categories")) {
         setCategories(fakeApi.library.categories.getAll())
         setIsLoading(false)
      } else {
         const timer = setTimeout(() => {
            setCategories(fakeApi.library.categories.getAll())
            setIsLoading(false)
            loadingState.markAsLoaded("categories")
         }, SKELETON_DELAY)

         return () => clearTimeout(timer)
      }
   }, [])

   const categoryKey = "cat"

   return (
      <Row justify="space-between" className="sm:flex sm:flex-row flex-col">
         {isLoading
            ? Array(3)
                 .fill(0)
                 .map((_, i) => (
                    <Col
                       key={`skeleton-${i}`}
                       className="2xl:min-w-[390px] relative h-[292px] p-10 overflow-hidden rounded-[10px] max-w-none mt-3 sm:mt-0 min-h-52"
                       span={7}>
                       <Skeleton.Avatar
                          active
                          size={500}
                          shape="square"
                          className="absolute bottom-[-100px] left-1/2 transform -translate-x-1/2"
                       />
                    </Col>
                 ))
            : categories.map(cat => (
                 <Col
                    key={cat.id}
                    className="2xl:min-w-[390px] hover:opacity-80 hover:scale-[1.01] transition-[0.25s] relative h-[292px] p-10 overflow-hidden text-center cursor-pointer bg-[var(--color-accent)] rounded-[10px] max-w-none mt-3 sm:mt-0 min-h-52"
                    span={7}
                    onClick={() => router.navigate({ to: `${ROUTES.CATALOG}?${categoryKey}=${cat.id}` })}
                    title="Go to books by category">
                    <div className="absolute top-1/2 left-1/2 z-10 text-white !important transform -translate-x-1/2 -translate-y-1/2 min-w-[180px]">
                       <Typography.Title className="font-roboto !text-white" level={3}>
                          {cat.name}
                       </Typography.Title>
                       <Typography.Text className="text-white">{cat.description}</Typography.Text>
                    </div>
                    <div className="absolute bottom-[-100px] left-1/2 text-[200px] transform -translate-x-1/2">
                       <img
                          className="brightness-[0.3] bg-cover max-w-max"
                          src={srcCategoriesMap[cat.id]}
                          alt="book logo"
                       />
                    </div>
                 </Col>
              ))}
      </Row>
   )
}

export { Categories }
