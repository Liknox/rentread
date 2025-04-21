import { Anchor, Button, Layout, Space } from "antd"
import { useTranslation } from "react-i18next"

import { TOPICS as topics } from "@app/configs/constants"
import { useMobileDetection } from "@shared/lib/browser"

type Props = {
   forceUpdate?: () => void
   className?: string
   isMobileView?: boolean
}

export const Sidebar = (props: Props) => {
   const { t } = useTranslation()
   const isMobile = useMobileDetection()
   const { className = "", isMobileView = false } = props

   if (isMobileView) {
      return (
         <Space className="w-full flex justify-around">
            {topics.map(topic => (
               <Button
                  key={topic.id}
                  type="text"
                  href={`#${topic.id}`}
                  onClick={props.forceUpdate}
                  className="text-xs py-1 px-2"
                  aria-label={t(topic.title)}>
                  {t(topic.title)}
               </Button>
            ))}
         </Space>
      )
   }

   return (
      <Layout.Sider width={80} className={`md:block ${isMobile ? "hidden" : ""} ${className}`}>
         <Anchor
            className="mt-5 text-[12px]"
            items={topics.map(topic => ({ key: topic.id, title: t(topic.title), href: `#${topic.id}` }))}
            onClick={props.forceUpdate}
            aria-label="Profile navigation anchor"
         />
      </Layout.Sider>
   )
}
