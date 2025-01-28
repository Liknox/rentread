/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC } from "react"
import { Typography, Layout } from "antd"

const SectionWrapper: FC<any> = ({ title, children }) => (
   <section>
      {title && <Typography.Title level={2}>{title}</Typography.Title>}
      {children}
   </section>
)

const sections: any[] = []

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
