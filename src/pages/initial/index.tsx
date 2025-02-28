import { useTitle } from "@shared/lib/dom"
import { Sections } from "./sections"
import { useTranslation } from "react-i18next"
import { TRANSLATIONS } from "@app/configs/constants/translation"

function IndexPage() {
   const { t } = useTranslation()
   useTitle(t(TRANSLATIONS.pageTitle.initial))
   return <Sections />
}

export default IndexPage
