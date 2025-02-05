import { Layout, Typography } from "antd"
import Sidebar from "./sidebar"

function CatalogPage() {
   return (
      <Layout.Content>
         <Typography.Title className="text-center mt-10" level={2}>
            Books Catalog
         </Typography.Title>
         <Layout className="mt-16">
            {/* <Content /> */}
            <Sidebar />
         </Layout>
      </Layout.Content>
   )
}

export default CatalogPage
