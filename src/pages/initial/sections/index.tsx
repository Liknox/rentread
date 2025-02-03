import { Layout, Typography } from "antd"
import type { FC, ReactNode } from "react"
import { sections } from "./model"

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
