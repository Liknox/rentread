import { Layout } from "antd"

import { useTitle } from "@shared/lib/dom"
import { useState } from "react"
import { Aside } from "./aside"
import { Content } from "./content"
import { Sidebar } from "./sidebar"
import { useTranslation } from "react-i18next"
import { TRANSLATIONS } from "@app/configs/constants/translation"

function ProfilePage() {
   const { t } = useTranslation()
   useTitle(t(TRANSLATIONS.pageTitle.profile))

   /* FIXME: Very bad practice. anyone, don't judge this way of solving the problem */
   // eslint-disable-next-line @typescript-eslint/no-unused-vars
   const [_, setUpdate] = useState<boolean>(false)

   const forceUpdate = () => {
      setTimeout(() => setUpdate(prev => !prev), 20)
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
