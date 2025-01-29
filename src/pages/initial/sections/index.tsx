/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC } from "react"
import { Typography, Layout } from "antd"
import Banner from "./banner"

const SectionWrapper: FC<any> = ({ title, children }) => (
   <section className="mb-20">
      {title && (
         <Typography.Title level={2} className="pb-8 mt-5 text-center">
            {title}
         </Typography.Title>
      )}
      {children}
   </section>
)

const sections: any[] = [
   {
      id: 1,
      Section: Banner,
   },
   {
      id: 2,
      title: "Book Categories",
      Section: Banner,
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
