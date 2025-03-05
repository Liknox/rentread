import { TRANSLATIONS } from "@app/configs/constants/translation"
import { useTranslation } from "react-i18next"
import Section from "../index"

const SocialSection = () => {
   const { t } = useTranslation()
   return (
      <Section id="social" innerClassName="font-roboto w-full md:w-1/2">
         <h2 className="text-3xl font-bold">{t(TRANSLATIONS.about.sections.socials.title)}</h2>
         <p className="my-4">{t(TRANSLATIONS.about.sections.socials.text)}</p>
         <p>{t(TRANSLATIONS.about.sections.socials.text2)}</p>
      </Section>
   )
}

export default SocialSection
