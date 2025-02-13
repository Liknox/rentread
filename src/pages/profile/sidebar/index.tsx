import { Layout, Anchor } from "antd"
import { topics } from "@app/configs/constants"

export const Sidebar = () => {
   return (
      <Layout.Sider width={80}>
         <Anchor className="mt-5 text-[12px]">
            {topics.map(topic => (
               <Anchor.Link key={topic.id} href={`#${topic.id}`} title={topic.title} />
            ))}
         </Anchor>
      </Layout.Sider>
   )
}
