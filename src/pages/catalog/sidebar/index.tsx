import { Checkbox, Divider, Layout, Slider, Typography } from "antd"
import { useTranslation } from "react-i18next"

import { PRICES, TARIFFS } from "@app/configs/constants"
import { TRANSLATIONS } from "@app/configs/constants/translation"
import { fakeApi } from "@shared/api"
import { useMobileDetection } from "@shared/lib/browser"
import * as catalogParams from "../params"

function Sidebar() {
   const { t } = useTranslation()
   const isMobile = useMobileDetection()

   return (
      <Layout.Sider width={isMobile ? "100%" : 400}>
         <div className="p-5 shadow-insetDark">
            <Typography.Title level={4} className="font-roboto text-center">
               {t(TRANSLATIONS.catalog.filters.title)}
            </Typography.Title>
            <ExistsOnlySection />
            <PriceSection />
            <TimeSection />
            <CategorySection />
            <AuthorSection />
            <PublisherSection />
         </div>
      </Layout.Sider>
   )
}

const ExistsOnlySection = () => {
   const { t } = useTranslation()
   const params = catalogParams.useExistsOnly()

   return (
      <section className="p-3">
         <Divider plain className="font-roboto">
            {t(TRANSLATIONS.catalog.filters.sections.exists.title)}
         </Divider>
         <Checkbox defaultChecked={params.existsOnly} onChange={e => params.setExistsOnly(e.target.checked)}>
            {t(TRANSLATIONS.catalog.filters.sections.exists.option)}
         </Checkbox>
      </section>
   )
}

const PriceSection = () => {
   const { t } = useTranslation()
   const params = catalogParams.usePrices()

   return (
      <section className="p-3">
         <Divider plain className="font-roboto">
            {t(TRANSLATIONS.catalog.filters.sections.rentPrice)}
         </Divider>
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
         />
      </section>
   )
}

/* FIXME: replace to datepicker later */
// FIXME: hardcode by query-params?
const TimeSection = () => {
   const { t } = useTranslation()
   const params = catalogParams.useTariff()

   const marks = {
      [TARIFFS.T7]: `${TARIFFS.T7}${t(TRANSLATIONS.catalog.filters.sections.days)}+`,
      [TARIFFS.T14]: `${TARIFFS.T14}${t(TRANSLATIONS.catalog.filters.sections.days)}+`,
      [TARIFFS.T30]: `${TARIFFS.T30}${t(TRANSLATIONS.catalog.filters.sections.days)}+`,
   }

   return (
      <section className="p-3">
         <Divider plain className="font-roboto">
            {t(TRANSLATIONS.catalog.filters.sections.rentTerms)}
         </Divider>
         <Slider
            marks={marks}
            defaultValue={params.tariff}
            onChange={(value: number) => params.setTariff(value)}
            min={TARIFFS.T7}
            max={TARIFFS.T30}
            step={null}
            // tipFormatter={(value) => value && Object.values(TARIFFS)[value - 1]}
         />
      </section>
   )
}

const CategorySection = () => {
   const { t } = useTranslation()
   const params = catalogParams.useFilterByCategory()
   // Some options could be disabled
   const options = fakeApi.library.categories.getAll().map(a => ({
      label: a.name,
      value: a.id,
   }))

   return (
      <section className="p-3">
         <Divider plain className="font-roboto">
            {t(TRANSLATIONS.catalog.filters.sections.categories)}
         </Divider>
         <Checkbox.Group
            options={options}
            value={params.categories || []}
            onChange={params.setCategories}
            aria-label="checkboxes-group"
         />
      </section>
   )
}

const AuthorSection = () => {
   const { t } = useTranslation()
   const params = catalogParams.useFilterByAuthor()
   const options = fakeApi.library.authors.getAll().map(a => ({
      label: fakeApi.library.authors.getShortname(a),
      value: a.id,
   }))

   return (
      <section className="p-3">
         <Divider plain className="font-roboto">
            {t(TRANSLATIONS.catalog.filters.sections.authors)}
         </Divider>
         <Checkbox.Group
            options={options}
            value={params.authors}
            onChange={params.setAuthors}
            aria-label="checkboxes-group"
         />
      </section>
   )
}

const PublisherSection = () => {
   const { t } = useTranslation()
   const params = catalogParams.useFilterByPublisher()
   const options = fakeApi.library.publishers.getAll().map(a => ({
      label: `${a.name} (${a.city})`,
      value: a.id,
   }))

   return (
      <section className="p-3">
         <Divider plain className="font-roboto">
            {t(TRANSLATIONS.catalog.filters.sections.publishers)}
         </Divider>
         <Checkbox.Group
            options={options}
            value={params.publishers || []}
            onChange={params.setPublishers}
            aria-label="checkboxes-group"
         />
      </section>
   )
}

export default Sidebar
