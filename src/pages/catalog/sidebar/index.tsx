import { Checkbox, Collapse, Divider, Layout, Slider, Typography } from "antd"
import { useTranslation } from "react-i18next"

import { PRICES, TARIFFS } from "@app/configs/constants"
import { TRANSLATIONS } from "@app/configs/constants/translation"
import { fakeApi } from "@shared/api"
import { useMobileDetection } from "@shared/lib/browser"
import * as catalogParams from "../params"

const { Panel } = Collapse

type SidebarProps = {
   className?: string
}

function Sidebar({ className = "" }: SidebarProps) {
   const { t } = useTranslation()
   const isMobile = useMobileDetection()

   return (
      <Layout.Sider width={isMobile ? "100%" : 380} className={className} aria-label="filters sidebar">
         <div className="p-3 md:p-5 rounded-lg shadow-insetDark">
            <Typography.Title level={4} className="font-roboto text-center mb-4" aria-label="filters title">
               {t(TRANSLATIONS.catalog.filters.title)}
            </Typography.Title>

            {isMobile ? (
               <Collapse defaultActiveKey={["1", "2", "3", "4"]} ghost aria-label="filters collapse">
                  <Panel
                     style={{ backgroundColor: "#f1f1ff" }}
                     header={t(TRANSLATIONS.catalog.filters.sections.exists.title)}
                     key="1"
                     aria-label="exists only">
                     <ExistsOnlySection />
                  </Panel>
                  <Panel header={t(TRANSLATIONS.catalog.filters.sections.rentPrice)} key="2" aria-label="rent price">
                     <PriceSection />
                  </Panel>
                  <Panel
                     style={{ backgroundColor: "#f1f1ff" }}
                     header={t(TRANSLATIONS.catalog.filters.sections.rentTerms)}
                     key="3"
                     aria-label="rent terms">
                     <TimeSection />
                  </Panel>
                  <Panel header={t(TRANSLATIONS.catalog.filters.sections.categories)} key="4" aria-label="categories">
                     <CategorySection />
                  </Panel>
                  <Panel
                     style={{ backgroundColor: "#f1f1ff" }}
                     header={t(TRANSLATIONS.catalog.filters.sections.authors)}
                     key="5"
                     aria-label="authors">
                     <AuthorSection />
                  </Panel>
                  <Panel header={t(TRANSLATIONS.catalog.filters.sections.publishers)} key="6" aria-label="publishers">
                     <PublisherSection />
                  </Panel>
               </Collapse>
            ) : (
               <>
                  <ExistsOnlySection />
                  <PriceSection />
                  <TimeSection />
                  <CategorySection />
                  <AuthorSection />
                  <PublisherSection />
               </>
            )}
         </div>
      </Layout.Sider>
   )
}

const ExistsOnlySection = () => {
   const { t } = useTranslation()
   const params = catalogParams.useExistsOnly()
   const isMobile = useMobileDetection()

   return (
      <section className="p-2 md:p-3" aria-label="exists only">
         {!isMobile && (
            <Divider plain className="font-roboto" aria-label="exists only divider">
               {t(TRANSLATIONS.catalog.filters.sections.exists.title)}
            </Divider>
         )}
         <Checkbox
            defaultChecked={params.existsOnly}
            onChange={e => params.setExistsOnly(e.target.checked)}
            aria-label="exists only">
            {t(TRANSLATIONS.catalog.filters.sections.exists.option)}
         </Checkbox>
      </section>
   )
}

const PriceSection = () => {
   const { t } = useTranslation()
   const params = catalogParams.usePrices()
   const isMobile = useMobileDetection()

   return (
      <section className="p-2 md:p-3" aria-label="rent price">
         {!isMobile && (
            <Divider plain className="font-roboto" aria-label="rent price divider">
               {t(TRANSLATIONS.catalog.filters.sections.rentPrice)}
            </Divider>
         )}
         <Slider
            range
            marks={{
               [PRICES.MIN]: `${PRICES.MIN} $`,
               [PRICES.MAX]: `${PRICES.MAX} $`,
            }}
            defaultValue={[params.from, params.to]}
            step={5}
            min={PRICES.MIN}
            max={PRICES.MAX}
            onChange={([from, to]) => params.setPrice(from, to)}
            aria-label="rent price slider"
         />
      </section>
   )
}

/* FIXME: replace to datepicker later */
// FIXME: hardcode by query-params?
const TimeSection = () => {
   const { t } = useTranslation()
   const params = catalogParams.useTariff()
   const isMobile = useMobileDetection()

   const marks = {
      [TARIFFS.T7]: `${TARIFFS.T7}${t(TRANSLATIONS.catalog.filters.sections.days)}+`,
      [TARIFFS.T14]: `${TARIFFS.T14}${t(TRANSLATIONS.catalog.filters.sections.days)}+`,
      [TARIFFS.T30]: `${TARIFFS.T30}${t(TRANSLATIONS.catalog.filters.sections.days)}+`,
   }

   return (
      <section className="p-2 md:p-3" aria-label="rent terms">
         {!isMobile && (
            <Divider plain className="font-roboto" aria-label="rent terms divider">
               {t(TRANSLATIONS.catalog.filters.sections.rentTerms)}
            </Divider>
         )}
         <Slider
            marks={marks}
            defaultValue={params.tariff}
            onChange={(value: number) => params.setTariff(value)}
            min={TARIFFS.T7}
            max={TARIFFS.T30}
            step={null}
            aria-label="rent terms slider"
         />
      </section>
   )
}

const CategorySection = () => {
   const { t } = useTranslation()
   const params = catalogParams.useFilterByCategory()
   const isMobile = useMobileDetection()
   // Some options could be disabled
   const options = fakeApi.library.categories.getAll().map(a => ({
      label: a.name,
      value: a.id,
   }))

   return (
      <section className="p-2 md:p-3" aria-label="categories">
         {!isMobile && (
            <Divider plain className="font-roboto" aria-label="categories divider">
               {t(TRANSLATIONS.catalog.filters.sections.categories)}
            </Divider>
         )}
         <Checkbox.Group
            options={options}
            value={params.categories || []}
            onChange={params.setCategories}
            aria-label="categories checkbox group"
            className="flex flex-col"
         />
      </section>
   )
}

const AuthorSection = () => {
   const { t } = useTranslation()
   const params = catalogParams.useFilterByAuthor()
   const isMobile = useMobileDetection()
   const options = fakeApi.library.authors.getAll().map(a => ({
      label: fakeApi.library.authors.getShortname(a),
      value: a.id,
   }))

   return (
      <section className="p-2 md:p-3" aria-label="authors">
         {!isMobile && (
            <Divider plain className="font-roboto" aria-label="authors divider">
               {t(TRANSLATIONS.catalog.filters.sections.authors)}
            </Divider>
         )}
         <Checkbox.Group
            options={options}
            value={params.authors}
            onChange={params.setAuthors}
            aria-label="authors checkbox group"
            className="flex flex-col"
         />
      </section>
   )
}

const PublisherSection = () => {
   const { t } = useTranslation()
   const params = catalogParams.useFilterByPublisher()
   const isMobile = useMobileDetection()
   const options = fakeApi.library.publishers.getAll().map(a => ({
      label: `${a.name} (${a.city})`,
      value: a.id,
   }))

   return (
      <section className="p-2 md:p-3" aria-label="publishers">
         {!isMobile && (
            <Divider plain className="font-roboto" aria-label="publishers divider">
               {t(TRANSLATIONS.catalog.filters.sections.publishers)}
            </Divider>
         )}
         <Checkbox.Group
            options={options}
            value={params.publishers || []}
            onChange={params.setPublishers}
            aria-label="publishers checkbox group"
            className="flex flex-col"
         />
      </section>
   )
}

export default Sidebar
