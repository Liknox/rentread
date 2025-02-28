import { TRANSLATIONS } from "@app/configs/constants/translation"
import { Alert } from "antd"
import { useTranslation } from "react-i18next"

export const DemoAlert = () => {
   const { t } = useTranslation()
   return (
      <Alert
         className="text-center hidden sm:flex"
         message={t(TRANSLATIONS.demoAlert)}
         type="info"
         closable={{
            closeIcon: <div>Close</div>,
         }}
      />
   )
}
