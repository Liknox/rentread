import { fakeApi } from "@shared/api"
import { Col, Row, Typography } from "antd"

import imgOrwell from "./assets/orwell.jpg"

const srcAuthorsMap: Record<number, string> = {
   2: imgOrwell,
   3: imgOrwell,
   7: imgOrwell,
   10: imgOrwell,
   13: imgOrwell,
}

const Authors = () => {
   const authorsQuery = fakeApi.library.authors.getPopular()

   return (
      <Row justify="space-around">
         {authorsQuery.map(author => (
            <Col
               key={author.id}
               className="transition-[0.25s] hover:opacity-80 hover:scale-[1.02] relative w-[180px] p-[30px] px-[40px] overflow-hidden text-center cursor-pointer bg-accent rounded-full aspect-square"
               span={3}
               // FIXME: hardcoded param!
               // onClick={() => history.push(`/catalog?authors=${au.id}`)}
               title="Go to the author's books"
            >
               <Typography.Title
                  className="absolute top-1/2 left-1/2 z-10 !text-white !important transform -translate-x-1/2 -translate-y-1/2"
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
