import { Layout, Anchor } from "antd"
import { topics } from "@app/configs/constants"

export const Sidebar = () => {
   return (
      <Layout.Sider width={80}>
         <Anchor
            className="mt-5 text-[12px]"
            items={topics.map(topic => ({ key: topic.id, title: topic.title, href: `#${topic.id}` }))}
         />
      </Layout.Sider>
   )
}
