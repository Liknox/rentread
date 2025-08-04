import type { SectionsDisplay } from "@shared/api"
import BenefitsSection from "../ui/benefits"
import FeaturesSection from "../ui/features"
import HeroSection from "../ui/hero"
import SocialSection from "../ui/socials"

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

export default sections
