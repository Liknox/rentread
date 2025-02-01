import type { SectionsRepresentation } from "@shared/api"
import { Layout, Typography } from "antd"
import type { FC, ReactNode } from "react"
import { Authors } from "./authors"
import { Banner } from "./banner"
import { Categories } from "./categories"
import { Books } from "./book"

type SectionWrapperTypes = {
   title?: string
   children: ReactNode
}

const SectionWrapper: FC<SectionWrapperTypes> = ({ title, children }) => (
   <section className="mb-20">
      {title && (
         <Typography.Title level={2} className="pb-8 mt-5 text-center">
            {title}
         </Typography.Title>
      )}
      {children}
   </section>
)

const sections: SectionsRepresentation = [
   {
      id: 1,
      Section: Banner,
   },
   {
      id: 2,
      title: "Book Categories",
      Section: Categories,
   },
   {
      id: 3,
      title: "Popular Authors",
      Section: Authors,
   },
   {
      id: 4,
      title: "Popular Authors",
      Section: Books,
   },
]

const Sections = () => (
   <Layout.Content>
      {sections.map(({ id, title, Section }) => (
         <SectionWrapper key={id} title={title}>
            <Section />
         </SectionWrapper>
      ))}
   </Layout.Content>
)

export { Sections }
