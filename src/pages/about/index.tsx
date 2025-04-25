import { Layout } from "antd"
import { useTranslation } from "react-i18next"

import { TRANSLATIONS } from "@app/configs/constants/translation"
import { useTitle } from "@shared/lib/dom"
import sections from "./sections/model"

/**
 * @page About Page
 */
function AboutPage() {
   const { t } = useTranslation()
   useTitle(t(TRANSLATIONS.pageTitle.about))

   return (
      <>
         <Layout.Content className="p-0">
            {sections.map(({ id, Section }) => (
               <Section key={id} />
            ))}
         </Layout.Content>
      </>
   )
}

export default AboutPage
