import { useRouter } from "@tanstack/react-router"
import { Col, Row, Typography } from "antd"

import { ROUTES } from "@app/configs/constants"
import { fakeApi } from "@shared/api"

import gaiman from "./assets/gaiman.webp"
import martin from "./assets/martin.webp"
import orwell from "./assets/orwell.webp"
import palahniuk from "./assets/palahniuk.webp"
import taleb from "./assets/taleb.webp"

const srcAuthorsMap: Record<number, string> = {
   2: palahniuk,
   3: taleb,
   7: gaiman,
   10: orwell,
   13: martin,
}

const Authors = () => {
   const router = useRouter()
   const authorsQuery = fakeApi.library.authors.getPopular()

   const authors = "authors"

   return (
      <Row justify="space-around" className="sm:flex sm:flex-row flex-col">
         {authorsQuery.map(author => (
            <Col
               key={author.id}
               className="min-w-[200px] m-auto mt-8 sm:mt-0 transition-[0.25s] hover:opacity-80 relative w-[180px] p-[30px] px-[40px] overflow-hidden text-center cursor-pointer bg-accent rounded-full aspect-square"
               span={3}
               onClick={() => router.navigate({ to: `${ROUTES.CATALOG}?${authors}=${author.id}` })}
               title="Go to the author's books">
               <Typography.Title
                  className="font-roboto absolute top-1/2 left-1/2 z-10 !text-white !important transform -translate-x-1/2 -translate-y-1/2"
                  level={4}>
                  {fakeApi.library.authors.getShortname(author)}
               </Typography.Title>
               <div className="absolute top-0 left-0 z-0">
                  {/* <UserOutlined {...au.avatar} /> */}
                  <img
                     className="brightness-[0.3] bg-cover max-w-max"
                     src={srcAuthorsMap[author.id]}
                     alt="Logo"
                     width={200}
                  />
               </div>
            </Col>
         ))}
      </Row>
   )
}

export { Authors }
