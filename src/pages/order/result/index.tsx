import { routes } from "@app/configs/constants"
import { TRANSLATIONS } from "@app/configs/constants/translation"
import { useTitle } from "@shared/lib/dom"
import { Button, Layout, Result } from "antd"
import { Cart } from "features/cart"
import { useTranslation } from "react-i18next"
import { HashLink } from "react-router-hash-link"

// TODO: Add skeletons loader

/**
 * @page Order Confirmation Page
 */
const ResultPage = () => {
   const { t } = useTranslation()
   useTitle(t(TRANSLATIONS.pageTitle.result))

   return (
      <Layout.Content>
         <Cart.Steps.View current={2} className="mb-10" />
         <Layout>
            <Result
               status="success"
               title={t(TRANSLATIONS.order.result.text)}
               subTitle={t(TRANSLATIONS.order.result.description)}
               extra={[
                  <HashLink to={`${routes.PROFILE}#opened`} key="order">
                     <Button type="primary" className="mb-2">
                        {t(TRANSLATIONS.order.result.toOrder)}
                     </Button>
                  </HashLink>,
                  <HashLink to={routes.CATALOG} key="catalog">
                     <Button>{t(TRANSLATIONS.order.result.toCatalog)}</Button>
                  </HashLink>,
               ]}
            />
         </Layout>
      </Layout.Content>
   )
}

export default ResultPage
