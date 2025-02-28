import { TRANSLATIONS } from "@app/configs/constants/translation"
import { useTitle } from "@shared/lib/dom"
import { useTranslation } from "react-i18next"

function NotFoundPage() {
   const { t } = useTranslation()
   useTitle(t(TRANSLATIONS.pageTitle.notFound))

   return (
      <div className="p-2">
         <h3>Not Found page</h3>
      </div>
   )
}

export default NotFoundPage
