import { Button } from "antd"
import { routes } from "@app/configs/constants"
import { TRANSLATIONS } from "@app/configs/constants/translation"
import { useTranslation } from "react-i18next"
import bg_hero from "../../assets/bg_hero.jpg"
import Section from "../index"
import { useNavigate } from "react-router-dom"

const HeroSection = () => {
   const navigate = useNavigate()
   const { t } = useTranslation()

   return (
      <Section
         style={{ backgroundImage: `url(${bg_hero})` }}
         innerClassName="text-white flex flex-col align-center w-full md:w-1/2">
         <div className="font-roboto relative z-10 p-5 text-white">
            <h2 className="text-white text-3xl font-medium">Rentread</h2>
            <p className="my-4">{t(TRANSLATIONS.about.sections.hero.text)}</p>
            <p className="my-4">{t(TRANSLATIONS.about.sections.hero.text2)}</p>
            <Button type="default" size="large" onClick={() => navigate(routes.CATALOG)}>
               {t(TRANSLATIONS.about.sections.hero.button)}
            </Button>
         </div>
      </Section>
   )
}

export default HeroSection
