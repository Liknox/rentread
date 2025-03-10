import { Layout } from "antd"

import { TRANSLATIONS } from "@app/configs/constants/translation"
import { useTitle } from "@shared/lib/dom"
import { useTranslation } from "react-i18next"
import { Aside } from "./aside"
import { Content } from "./content"
import { Sidebar } from "./sidebar"

function ProfilePage() {
   const { t } = useTranslation()
   useTitle(t(TRANSLATIONS.pageTitle.profile))

   return (
      <Layout.Content>
         <Layout className="flex !flex-col md:!flex-row">
            <Aside />
            <Content />
            <Sidebar />
         </Layout>
      </Layout.Content>
   )
}

export default ProfilePage
