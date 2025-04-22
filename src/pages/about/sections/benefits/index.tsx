import { useTranslation } from "react-i18next"

import { TRANSLATIONS } from "@app/configs/constants/translation"
import Section from "../index"

import bg_books from "../../assets/bg_books.webp"

const BenefitsSection = () => {
   const { t } = useTranslation()
   return (
      <Section
         id="benefits"
         style={{ backgroundImage: `url(${bg_books})` }}
         innerClassName="font-roboto w-full md:w-1/2">
         <h2 className="text-3xl font-bold">{t(TRANSLATIONS.about.sections.benefits.title)}</h2>
         <p className="my-4">
            Purchased books usually end up gathering dust on the shelf over time. Instead, you can entrust them to our
            service for rental, earning passive income!
         </p>
         <p>
            {t(TRANSLATIONS.about.sections.benefits.text1)} <b>{t(TRANSLATIONS.about.sections.benefits.bold)}</b>{" "}
            {t(TRANSLATIONS.about.sections.benefits.text2)}
         </p>
      </Section>
   )
}

export default BenefitsSection
