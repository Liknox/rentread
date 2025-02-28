import { TRANSLATIONS } from "@app/configs/constants/translation"
import { Layout } from "antd"
import { useTranslation } from "react-i18next"

function Footer() {
   const { i18n, t } = useTranslation()

   return (
      <Layout.Footer className="text-center">
         Rentread ©{new Date().getFullYear()} {t(TRANSLATIONS.footer.text)}{" "}
         <a href="https://github.com/Liknox/rentread" target="_blank" rel="noreferrer" className="text-primary">
            {t(TRANSLATIONS.footer.name)}
         </a>
         <button onClick={() => i18n.changeLanguage("en")}>en</button>
         <button onClick={() => i18n.changeLanguage("ua")}>ua</button>
      </Layout.Footer>
   )
}

export default Footer
