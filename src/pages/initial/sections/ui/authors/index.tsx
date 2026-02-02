import { useRouter } from "@tanstack/react-router"
import { Col, Row, Skeleton, Typography } from "antd"

import { ROUTES, SKELETON_KEYS } from "@app/configs/constants"
import { fakeApi } from "@shared/api"
import { useSkeleton } from "@shared/lib"

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
  const isLoading = useSkeleton(SKELETON_KEYS.AUTHOR)
  const authors = fakeApi.library.authors.getPopular()

  return (
    <Row justify="space-around" className="sm:flex sm:flex-row flex-col">
      {isLoading
        ? Array(5)
            .fill(0)
            .map((_, i) => (
              <Col key={`skeleton-${i}`} className="min-w-[200px] m-auto mt-8 sm:mt-0" span={3}>
                <Skeleton.Avatar active size={200} shape="circle" />
              </Col>
            ))
        : authors.map(author => (
            <Col
              key={author.id}
              className="min-w-[200px] m-auto mt-8 sm:mt-0 transition-[0.25s] hover:opacity-80 relative w-[180px] p-[30px] px-[40px] overflow-hidden text-center cursor-pointer bg-accent rounded-full aspect-square"
              span={3}
              onClick={() => router.navigate({ to: `${ROUTES.CATALOG}?${SKELETON_KEYS.AUTHOR}=${author.id}` })}
              role="button"
              aria-label={`View books by ${fakeApi.library.authors.getShortname(author)}`}
              title="Go to the author's books">
              <Typography.Title
                className="font-roboto absolute top-1/2 left-1/2 z-10 !text-white !important transform -translate-x-1/2 -translate-y-1/2"
                level={4}>
                {fakeApi.library.authors.getShortname(author)}
              </Typography.Title>
              <div className="absolute top-0 left-0 z-0">
                <img
                  className="brightness-[0.3] bg-cover max-w-max"
                  src={srcAuthorsMap[author.id]}
                  alt={`${fakeApi.library.authors.getShortname(author)} portrait`}
                  width={"100%"}
                  height={"100%"}
                />
              </div>
            </Col>
          ))}
    </Row>
  )
}

export { Authors }
