import { Layout } from "antd"

import { TRANSLATIONS } from "@app/configs/constants/translation"
import { useTitle } from "@shared/lib/dom"
import { useState } from "react"
import { useTranslation } from "react-i18next"
import { Content } from "./content"
import { Sidebar } from "./sidebar"
import { TIMEOUT } from "@app/configs/constants"
import { Aside } from "entities/aside"

function ProfilePage() {
   const { t } = useTranslation()
   useTitle(t(TRANSLATIONS.pageTitle.profile))

   /* FIXME: Very bad practice, -_-) */
   // eslint-disable-next-line @typescript-eslint/no-unused-vars
   const [_, setUpdate] = useState<boolean>(false)

   const forceUpdate = () => {
      setTimeout(() => setUpdate(prev => !prev), TIMEOUT.FORCE_UPDATE)
   }

   return (
      <Layout.Content>
         <Layout className="flex !flex-col md:!flex-row">
            <Aside />
            <Content />
            <Sidebar forceUpdate={forceUpdate} />
         </Layout>
      </Layout.Content>
   )
}

export default ProfilePage
