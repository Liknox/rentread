import { useTranslation } from "react-i18next"

import { TRANSLATIONS } from "@app/configs/constants/translation"
import { useTitle } from "@shared/lib/dom"
import { Sections } from "./sections"

function IndexPage() {
   const { t } = useTranslation()
   useTitle(t(TRANSLATIONS.pageTitle.initial))
   return <Sections />
}

export default IndexPage
