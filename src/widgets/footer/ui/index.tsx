import { Layout } from "antd"
import { useTranslation } from "react-i18next"

function Footer() {
   const { i18n } = useTranslation()

   return (
      <Layout.Footer className="text-center">
         Rentread ©{new Date().getFullYear()} Created by{" "}
         <a href="https://github.com/Liknox/rentread" target="_blank" rel="noreferrer" className="text-primary">
            Nazar Koval
         </a>
         <button onClick={() => i18n.changeLanguage("en")}>en</button>
         <button onClick={() => i18n.changeLanguage("ua")}>ua</button>
      </Layout.Footer>
   )
}

export default Footer
