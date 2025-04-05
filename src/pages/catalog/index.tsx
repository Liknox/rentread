import { Layout, Typography } from "antd"
import { useTranslation } from "react-i18next"

import { TRANSLATIONS } from "@app/configs/constants/translation"
import { isMobile } from "@shared/lib/browser"
import { useTitle } from "@shared/lib/dom"
import CatalogContent from "./content"
import Sidebar from "./sidebar"

function CatalogPage() {
   const { t } = useTranslation()
   useTitle(t(TRANSLATIONS.pageTitle.catalog))

   return (
      <Layout.Content className="p-5 md:p-[40px_10%] mb-20 md:mb-0">
         <Typography.Title className="font-roboto text-center md:mt-10 mt-4" level={2}>
            {t(TRANSLATIONS.catalog.title)}
         </Typography.Title>
         <Layout className="md:mt-16 mt-8">
            <CatalogContent />
            {isMobile || <Sidebar />}
         </Layout>
      </Layout.Content>
   )
}

export default CatalogPage
