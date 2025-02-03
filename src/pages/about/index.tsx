import type { SectionsDisplay } from "@shared/api"
import { useTitle } from "@shared/lib/dom"
import { Layout } from "antd"

import BenefitsSection from "./sections/benefits"
import FeaturesSection from "./sections/features"
import HeroSection from "./sections/hero"
import SocialSection from "./sections/socials"

function About() {
   useTitle("About us - RentRead")
   return (
      <>
         <Layout.Content>
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
      title: "Hero",
      Section: HeroSection,
   },
   {
      id: 2,
      title: "Benefits",
      Section: BenefitsSection,
   },
   {
      id: 3,
      title: "Features",
      Section: FeaturesSection,
   },
   {
      id: 4,
      title: "Socials",
      Section: SocialSection,
   },
]

export default About
