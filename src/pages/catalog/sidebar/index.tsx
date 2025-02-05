import { Typography, Layout, Divider, Checkbox } from "antd"
import * as catalogParams from "../params"
import { fakeApi } from "@shared/api"

function Sidebar() {
   return (
      <Layout.Sider width={400}>
         <div className="p-5 shadow-inset">
            <Typography.Title level={4} className="text-center">
               Filters
            </Typography.Title>
            <AuthorSection />
            <PublisherSection />
         </div>
      </Layout.Sider>
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

export default Sidebar
