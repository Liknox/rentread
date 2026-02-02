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
    <Layout.Footer
      className="flex justify-between items-center flex-col md:flex-row py-6 px-4 md:px-[10%] gap-3 md:gap-4 shadow-inner"
      role="contentinfo"
      aria-label="footer">
      <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4">
        <span className="font-medium" aria-label="copyright">
          Rentread {new Date().getFullYear()}
        </span>
        <p className="text-center md:text-left mb-0" aria-label="text">
          {t(TRANSLATIONS.footer.text)}{" "}
          <a
            href="https://github.com/Liknox/rentread"
            target="_blank"
            rel="noreferrer"
            className="text-primary hover:underline"
            aria-label="github repository">
            {t(TRANSLATIONS.footer.name)}
          </a>
        </p>
      </div>
      <Select
        defaultValue={savedLanguage}
        className="w-[65px]"
        popupMatchSelectWidth={false}
        onChange={value => i18n.changeLanguage(value)}
        aria-label="language selector">
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
