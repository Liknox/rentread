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
            {/* <AuthorSection /> */}
         </div>
      </Layout.Sider>
   )
}

const AuthorSection = () => {
   const params = catalogParams.useFilterByAuthor()
   // Some options could be disabled
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
            aria-label="authors-checkbox"
         />
      </section>
   )
}

export default Sidebar
