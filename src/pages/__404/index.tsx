import { routes } from "@app/configs/constants"
import { TRANSLATIONS } from "@app/configs/constants/translation"
import { useTitle } from "@shared/lib/dom"
import { Button, Layout } from "antd"
import { useTranslation } from "react-i18next"
import { Link } from "react-router-dom"

function NotFoundPage() {
   const { t } = useTranslation()
   useTitle(t(TRANSLATIONS.pageTitle.notFound))

   return (
      <Layout.Content>
         <Layout>
            <div className="font-roboto flex flex-col items-center justify-center gap-3 h-[70vh]">
               <h1 className="text-[20px]">404 - {t(TRANSLATIONS.notFound.title)}</h1>
               <div className="flex flex-row gap-3">
                  <Link to={`${routes.CATALOG}#opened`} key="catalog">
                     <Button type="primary">{t(TRANSLATIONS.notFound.catalog)}</Button>
                  </Link>
                  <Link to={routes.DEFAULT} key="main">
                     <Button>{t(TRANSLATIONS.notFound.main)}</Button>
                  </Link>
               </div>
            </div>
         </Layout>
      </Layout.Content>
   )
}

export default NotFoundPage
