import { TRANSLATIONS } from "@app/configs/constants/translation"
import { savedLanguage } from "@app/configs/language/i18n.config"
import { Layout, Select } from "antd"
import { useTranslation } from "react-i18next"

const { Option } = Select

const langs = [
   { value: "ua", label: "ua" },
   { value: "en", label: "en" },
]

function Footer() {
   const { i18n, t } = useTranslation()

   return (
      <Layout.Footer className="flex justify-center items-center md:flex-row flex-col gap-1">
         Rentread ©{new Date().getFullYear()}
         <p>
            {t(TRANSLATIONS.footer.text)}{" "}
            <a href="https://github.com/Liknox/rentread" target="_blank" rel="noreferrer" className="text-primary">
               {t(TRANSLATIONS.footer.name)}
            </a>
         </p>
         <Select defaultValue={savedLanguage} className="w-[60px] ml-1" onChange={value => i18n.changeLanguage(value)}>
            {langs.map(lang => (
               <Option key={lang.value} value={lang.value}>
                  {lang.label}
               </Option>
            ))}
         </Select>
      </Layout.Footer>
   )
}

export default Footer
