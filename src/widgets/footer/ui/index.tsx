import { TRANSLATIONS } from "@app/configs/constants/translation"
import { Layout, Select } from "antd"
import { useTranslation } from "react-i18next"

const { Option } = Select

function Footer() {
   const { i18n, t } = useTranslation()

   return (
      <Layout.Footer className="text-center">
         Rentread ©{new Date().getFullYear()} {t(TRANSLATIONS.footer.text)}{" "}
         <a href="https://github.com/Liknox/rentread" target="_blank" rel="noreferrer" className="text-primary">
            {t(TRANSLATIONS.footer.name)}
         </a>
         <Select defaultValue="en" className="w-[60px] ml-2" onChange={value => i18n.changeLanguage(value)}>
            <Option key={1} value="ua">
               ua
            </Option>
            <Option key={2} value="en">
               en
            </Option>
         </Select>
      </Layout.Footer>
   )
}

export default Footer
