import { Layout, Skeleton, Typography } from "antd"
import type { FC, ReactNode } from "react"
import { useTranslation } from "react-i18next"

import { SKELETON_KEYS } from "@app/configs/constants"
import { useSkeleton } from "@shared/lib/skeleton/useSkeleton"
import { sections } from "./model"

type SectionWrapperTypes = {
   title?: string
   children: ReactNode
}

const SectionWrapper: FC<SectionWrapperTypes> = ({ title, children }) => {
   const { t } = useTranslation()
   const isLoading = useSkeleton(SKELETON_KEYS.SECTION)

   return (
      <section className="mb-20">
         {isLoading ? (
            <div className="flex justify-center">
               {title && <Skeleton.Input active style={{ width: 210, height: 38, marginBottom: 32 }} />}
            </div>
         ) : (
            <>
               {title && (
                  <Typography.Title level={2} className="font-roboto pb-8 mt-5 text-center">
                     {t(title)}
                  </Typography.Title>
               )}
            </>
         )}
         {children}
      </section>
   )
}

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
