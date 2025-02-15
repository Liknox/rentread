import { topics } from "@app/configs/constants"
import { Anchor, Layout } from "antd"

type Props = {
   forceUpdate: () => void
}

export const Sidebar = (props: Props) => {
   return (
      <Layout.Sider width={80}>
         <Anchor
            className="mt-5 text-[12px]"
            items={topics.map(topic => ({ key: topic.id, title: topic.title, href: `#${topic.id}` }))}
            onClick={props.forceUpdate}
         />
      </Layout.Sider>
   )
}
