import { useRouter } from "@tanstack/react-router"
import { Button } from "antd"
import { useTranslation } from "react-i18next"

import { ROUTES } from "@app/configs/constants"
import { TRANSLATIONS } from "@app/configs/constants/translation"
import { useMobileDetection } from "@shared/lib/browser"
import Section from "../index"

import bg_hero from "../../assets/bg_hero.webp"

const HeroSection = () => {
  const router = useRouter()
  const { t } = useTranslation()
  const isMobile = useMobileDetection()

  return (
    <Section
      style={{ backgroundImage: `url(${bg_hero})` }}
      innerClassName="text-white flex flex-col align-center w-full md:w-1/2"
      aria-label="hero section">
      <div className="font-roboto relative z-10 p-5 text-white">
        <h2 className="text-white text-2xl md:text-3xl font-medium">Rentread</h2>
        <p className="my-4 text-sm md:text-base">{t(TRANSLATIONS.about.sections.hero.text)}</p>
        <p className="my-4 text-sm md:text-base">{t(TRANSLATIONS.about.sections.hero.text2)}</p>
        <Button
          type="default"
          size={isMobile ? "middle" : "large"}
          onClick={() => router.navigate({ to: ROUTES.CATALOG })}
          aria-label="explore catalog button">
          {t(TRANSLATIONS.about.sections.hero.button)}
        </Button>
      </div>
    </Section>
  )
}

export default HeroSection
