import { useRouter } from "@tanstack/react-router"
import { Button } from "antd"
import { useTranslation } from "react-i18next"

import { routes } from "@app/configs/constants"
import { TRANSLATIONS } from "@app/configs/constants/translation"
import Section from "../index"

import bg_hero from "../../assets/bg_hero.jpg"

const HeroSection = () => {
   const router = useRouter()
   const { t } = useTranslation()

   return (
      <Section
         style={{ backgroundImage: `url(${bg_hero})` }}
         innerClassName="text-white flex flex-col align-center w-full md:w-1/2"
         aria-label="hero section">
         <div className="font-roboto relative z-10 p-5 text-white">
               aria-label="explore catalog button">
               {t(TRANSLATIONS.about.sections.hero.button)}
            </Button>
         </div>
      </Section>
   )
}

export default HeroSection
