import { topics } from "@app/configs/constants"
import { Anchor, Layout } from "antd"
import { useTranslation } from "react-i18next"

export const Sidebar = () => {
   const { t } = useTranslation()
   return (
      <Layout.Sider width={80} className="md:block hidden">
         <Anchor
            className="mt-5 text-[12px]"
            items={topics.map(topic => ({ key: topic.id, title: t(topic.title), href: `#${topic.id}` }))}
         />
      </Layout.Sider>
   )
}
