import { Layout } from "antd"

import { useTitle } from "@shared/lib/dom"
import { Aside } from "./aside"
import { Sidebar } from "./sidebar"

function ProfilePage() {
   useTitle("Profile - RentRead")
   return (
      <Layout.Content>
         <Layout>
            <Aside />
            {/* main content */}
            <Sidebar />
         </Layout>
      </Layout.Content>
   )
}

export default ProfilePage
