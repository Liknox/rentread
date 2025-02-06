import { PRICES, TARIFFS } from "@app/configs/constants"
import { fakeApi } from "@shared/api"
import { Checkbox, Divider, Layout, Slider, Typography } from "antd"
import * as catalogParams from "../params"

function Sidebar() {
   return (
      <Layout.Sider width={400}>
         <div className="p-5 shadow-insetDark">
            <Typography.Title level={4} className="text-center">
               Filters
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
   const params = catalogParams.useExistsOnly()

   return (
      <section className="p-3">
         <Divider plain>General</Divider>
         <Checkbox defaultChecked={params.existsOnly} onChange={e => params.setExistsOnly(e.target.checked)}>
            Only in stock
         </Checkbox>
      </section>
   )
}

/* FIXME: replace to datepicker later */
// FIXME: hardcode by query-params?
const TimeSection = () => {
   const params = catalogParams.useTariff()

   const marks = {
      [TARIFFS.T7]: `${TARIFFS.T7}+ дн`,
      [TARIFFS.T14]: `${TARIFFS.T14}+ дн`,
      [TARIFFS.T30]: `${TARIFFS.T30}+ дн`,
   }

   return (
      <section className="p-3">
         <Divider plain>Term of rent</Divider>
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

const PriceSection = () => {
   const params = catalogParams.usePrices()

   return (
      <section className="p-3">
         <Divider plain>Rent Price</Divider>
         <Slider
            range
            marks={{
               [PRICES.MIN]: `${PRICES.MIN} р`,
               [PRICES.MAX]: `${PRICES.MAX} р`,
            }}
            defaultValue={[params.from, params.to]}
            step={50}
            min={PRICES.MIN}
            max={PRICES.MAX}
            onChange={([from, to]) => params.setPrice(from, to)}
         />
      </section>
   )
}

const AuthorSection = () => {
   const params = catalogParams.useFilterByAuthor()
   const options = fakeApi.library.authors.getAll().map(a => ({
      label: fakeApi.library.authors.getShortname(a),
      value: a.id,
   }))

   return (
      <section className="p-3">
         <Divider plain>Authors</Divider>
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
   const params = catalogParams.useFilterByPublisher()
   const options = fakeApi.library.publishers.getAll().map(a => ({
      label: `${a.name} (${a.city})`,
      value: a.id,
   }))

   return (
      <section className="p-3">
         <Divider plain>Publishers</Divider>
         <Checkbox.Group
            options={options}
            value={params.publishers || []}
            onChange={params.setPublishers}
            aria-label="checkboxes-group"
         />
      </section>
   )
}

const CategorySection = () => {
   const params = catalogParams.useFilterByCategory()
   // Some options could be disabled
   const options = fakeApi.library.categories.getAll().map(a => ({
      label: a.name,
      value: a.id,
   }))

   return (
      <section className="p-3">
         <Divider plain>Categories</Divider>
         <Checkbox.Group
            options={options}
            value={params.categories || []}
            onChange={params.setCategories}
            aria-label="checkboxes-group"
         />
      </section>
   )
}

export default Sidebar
