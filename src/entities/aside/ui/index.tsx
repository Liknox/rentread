import { CheckCircleOutlined, ClockCircleOutlined, UserOutlined } from "@ant-design/icons"
import { Avatar, Divider, Layout, Typography } from "antd"
import { useTranslation } from "react-i18next"

import { TRANSLATIONS } from "@app/configs/constants/translation"
import { useMobileDetection } from "@shared/lib/browser"
import Tile from "@shared/ui/tile"
import { viewerModel } from "entities/viewer"
import { Wallet } from "features/wallet"
import * as lib from "../index"

export const Aside = () => {
   const viewer = viewerModel.useViewer()
   const isMobile = useMobileDetection()

   return (
      <Layout.Sider width={isMobile ? "100%" : 400}>
         <div className="p-10 text-center shadow-insetDark rounded-md">
            <section className="flex flex-col items-center">
               <Avatar size={128} icon={<UserOutlined />} />
               <Typography.Title level={3} className="mt-10">
                  {viewer.firstName} {viewer.lastName}
               </Typography.Title>
               <Typography.Text>
                  {viewer.email}&nbsp;
                  <EmailVerified emailVerified={viewer.emailVerified} />
               </Typography.Text>
            </section>
            <Divider />
            <section>
               <Wallet.AddFunds.Popover
                  placement={isMobile ? "bottom" : "right"}
                  buttonStyle={{ fontSize: 30, height: 60, width: "100%" }}
               />
            </section>
            <Divider />
            <section>
               <Tile.Group data={lib.getStats(viewer)} itemSpan={11} />
            </section>
         </div>
      </Layout.Sider>
   )
}

const EmailVerified = ({ emailVerified }: { emailVerified: boolean }) => {
   const { t } = useTranslation()
   if (emailVerified) {
      return <CheckCircleOutlined title={t(TRANSLATIONS.tooltip.emailVerified)} style={{ color: "green" }} />
   }

   return <ClockCircleOutlined title={t(TRANSLATIONS.tooltip.confirmationAwaiting)} style={{ color: "red" }} />
}
