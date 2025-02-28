import Section from "../index"

import { TRANSLATIONS } from "@app/configs/constants/translation"
import { useTranslation } from "react-i18next"
import bg_laptop from "../../assets/bg_laptop.jpg"

const FeaturesSection = () => {
   const { t } = useTranslation()
   return (
      <Section id="features" style={{ backgroundImage: `url(${bg_laptop})` }} innerClassName="w-full md:w-1/2">
         <h2 className="text-3xl font-bold">{t(TRANSLATIONS.about.sections.features.title)}</h2>
         <ul className="mt-4">
            <li>{t(TRANSLATIONS.about.sections.features.text1)}</li>
            <li>{t(TRANSLATIONS.about.sections.features.text2)}</li>
            <li>{t(TRANSLATIONS.about.sections.features.text3)}</li>
            <li>{t(TRANSLATIONS.about.sections.features.text4)}</li>
            <li>{t(TRANSLATIONS.about.sections.features.text5)}</li>
            <li>{t(TRANSLATIONS.about.sections.features.text6)}</li>
            <li>{t(TRANSLATIONS.about.sections.features.text7)}</li>
         </ul>
      </Section>
   )
}

export default FeaturesSection
