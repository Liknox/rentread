import { Typography, Layout, Divider, Checkbox } from "antd"
import * as catalogParams from "../params"
import { fakeApi } from "@shared/api"

function Sidebar() {
   return (
      <Layout.Sider width={400}>
         <div className="p-5 shadow-insetDark">
            <Typography.Title level={4} className="text-center">
               Filters
            </Typography.Title>
            <ExistsOnlySection />
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
