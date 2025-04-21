import { Layout } from "antd"
import { useTranslation } from "react-i18next"

import { TRANSLATIONS } from "@app/configs/constants/translation"
import type { SectionsDisplay } from "@shared/api"
import { useTitle } from "@shared/lib/dom"
import BenefitsSection from "./sections/benefits"
import FeaturesSection from "./sections/features"
import HeroSection from "./sections/hero"
import SocialSection from "./sections/socials"

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

const sections: SectionsDisplay = [
   {
      id: 1,
      Section: HeroSection,
   },
   {
      id: 2,
      Section: BenefitsSection,
   },
   {
      id: 3,
      Section: FeaturesSection,
   },
   {
      id: 4,
      Section: SocialSection,
   },
]

export default AboutPage
