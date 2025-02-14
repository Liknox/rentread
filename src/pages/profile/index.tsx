import { Layout } from "antd"

import { useTitle } from "@shared/lib/dom"
import { Aside } from "./aside"
import { Sidebar } from "./sidebar"
import { Content } from "./content"

function ProfilePage() {
   useTitle("Profile - RentRead")
   return (
      <Layout.Content>
         <Layout>
            <Aside />
            <Content />
            <Sidebar />
         </Layout>
      </Layout.Content>
   )
}

export default ProfilePage
