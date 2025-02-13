import { useTitle } from "@shared/lib/dom"
import { Layout, Typography } from "antd"
import CatalogContent from "./content"
import Sidebar from "./sidebar"

function CatalogPage() {
   useTitle("Books Catalog - RentRead")
   return (
      <Layout.Content>
         <Typography.Title className="text-center mt-10" level={2}>
            Books Catalog
         </Typography.Title>
         <Layout className="mt-16">
            <CatalogContent />
            <Sidebar />
         </Layout>
      </Layout.Content>
   )
}

export default CatalogPage
