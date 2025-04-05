import { Alert } from "antd"
import { useTranslation } from "react-i18next"

import { PERSIST_STORE_ITEMS } from "@app/configs/constants"
import { TRANSLATIONS } from "@app/configs/constants/translation"

export const DemoAlert = () => {
   const { t } = useTranslation()
   const isVisible = localStorage.getItem(`RENTREAD:/${PERSIST_STORE_ITEMS.demoAlert}`) === "false"

   return (
      <>
         {!isVisible && (
            <Alert
               className="text-center hidden sm:flex"
               message={t(TRANSLATIONS.demoAlert.text)}
               type="info"
               closable={{
                  closeIcon: (
                     <div onClick={() => localStorage.setItem(`RENTREAD:/${PERSIST_STORE_ITEMS.demoAlert}`, "false")}>
                        {t(TRANSLATIONS.demoAlert.close)}
                     </div>
                  ),
               }}
            />
         )}
      </>
   )
}
