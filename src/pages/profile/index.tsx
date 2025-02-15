import { Layout } from "antd"

import { useTitle } from "@shared/lib/dom"
import { Aside } from "./aside"
import { Content } from "./content"
import { Sidebar } from "./sidebar"
import { useState } from "react"

function ProfilePage() {
   useTitle("Profile - RentRead")

   /* FIXME: Very bad practice. anyone, don't judge this way of solving the problem */
   // eslint-disable-next-line @typescript-eslint/no-unused-vars
   const [_, setUpdate] = useState<boolean>(false)

   const forceUpdate = () => {
      setTimeout(() => setUpdate(prev => !prev), 20)
   }

   return (
      <Layout.Content>
         <Layout>
            <Aside />
            <Content />
            <Sidebar forceUpdate={forceUpdate} />
         </Layout>
      </Layout.Content>
   )
}

export default ProfilePage
