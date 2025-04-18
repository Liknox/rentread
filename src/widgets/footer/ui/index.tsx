import { Layout, Select } from "antd"
import { useTranslation } from "react-i18next"

import { TRANSLATIONS } from "@app/configs/constants/translation"
import { savedLanguage } from "@app/configs/language/i18n.config"

const { Option } = Select

const langs = [
   { label: "ua", value: "ua" },
   { label: "en", value: "en" },
]

function Footer() {
   const { i18n, t } = useTranslation()

   return (
      <Layout.Footer className="flex justify-center items-center md:flex-row flex-col gap-1" role="contentinfo">
         Rentread {new Date().getFullYear()}
         <p>
            {t(TRANSLATIONS.footer.text)}{" "}
            <a
               href="https://github.com/Liknox/rentread"
               target="_blank"
               rel="noreferrer"
               className="text-primary"
               aria-label="GitHub Repository">
               {t(TRANSLATIONS.footer.name)}
            </a>
         </p>
         <Select
            defaultValue={savedLanguage}
            className="w-[60px] ml-1"
            onChange={value => i18n.changeLanguage(value)}
            aria-label="Language Selector">
            {langs.map(lang => (
               <Option key={lang.value} value={lang.value} aria-label={`Switch language to ${lang.label}`}>
                  {lang.label}
               </Option>
            ))}
         </Select>
      </Layout.Footer>
   )
}

export default Footer
