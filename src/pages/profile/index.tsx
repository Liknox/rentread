import { Layout } from "antd"
import { useState } from "react"
import { useTranslation } from "react-i18next"

import { TIMEOUT } from "@app/configs/constants"
import { TRANSLATIONS } from "@app/configs/constants/translation"
import { useBreakpoint } from "@shared/lib/browser"
import { useTitle } from "@shared/lib/dom"
import { Aside } from "entities/aside"
import { Content } from "./content"
import { Sidebar } from "./sidebar"

/**
 * @page Profile Page
*/
function ProfilePage() {
   const { t } = useTranslation()
   const breakpoint = useBreakpoint()
   useTitle(t(TRANSLATIONS.pageTitle.profile))

   /* FIXME: Very bad practice, -_-) */
   // eslint-disable-next-line @typescript-eslint/no-unused-vars
   const [_, setUpdate] = useState<boolean>(false)

   const forceUpdate = () => {
      setTimeout(() => setUpdate(prev => !prev), TIMEOUT.FORCE_UPDATE)
   }

   return (
      <Layout.Content className="p-4 md:p-[40px_10%] mb-20 md:mb-0">
         <Layout className="flex !flex-col md:!flex-row bg-transparent">
            <Aside />
            <div className="flex-grow">
               <Content />
            </div>
            {!breakpoint.xs && <Sidebar forceUpdate={forceUpdate} className="ml-0 md:ml-6 mt-6 md:mt-0" />}
            {breakpoint.xs && (
               <div className="fixed bottom-2 left-0 right-0 backdrop-blur-sm shadow-lg z-10 p-2">
                  <Sidebar forceUpdate={forceUpdate} isMobileView={true} />
               </div>
            )}
         </Layout>
      </Layout.Content>
   )
}

export default ProfilePage
