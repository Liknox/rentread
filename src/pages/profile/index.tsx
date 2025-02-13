import { Layout } from "antd"

import { useTitle } from "@shared/lib/dom"
import { Aside } from "./aside"

function ProfilePage() {
   useTitle("Profile - RentRead")
   return (
      <Layout.Content>
         <Layout>
            <Aside />
         </Layout>
      </Layout.Content>
   )
}

export default ProfilePage
