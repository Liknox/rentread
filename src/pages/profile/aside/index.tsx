import { CheckCircleOutlined, ClockCircleOutlined, UserOutlined } from "@ant-design/icons"
import Tile from "@shared/ui/tile"
import { Avatar, Divider, Layout, Typography } from "antd"
import { viewerModel } from "entities/viewer"
import { Wallet } from "features/wallet"
import * as lib from "../lib"

export const Aside = () => {
   const viewer = viewerModel.useViewer()

   /* FIXME: move to entities */
   return (
      <Layout.Sider width={400}>
         <div className="p-10 text-center shadow-insetDark rounded-md">
            <section className="flex flex-col items-center">
               <Avatar size={128} icon={<UserOutlined />} />
               <Typography.Title level={3} style={{ marginTop: 10 }}>
                  {viewer.firstName} {viewer.lastName}
               </Typography.Title>
               <Typography.Text>
                  {viewer.email}&nbsp;
                  <EmailVerified emailVerified={viewer.emailVerified} />
               </Typography.Text>
            </section>
            <Divider />
            <section>
               <Wallet.AddFunds.Popover placement="right" buttonStyle={{ fontSize: 30, height: 60, width: "100%" }} />
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
   if (emailVerified) {
      return <CheckCircleOutlined title="Email verified" style={{ color: "green" }} />
   }

   return <ClockCircleOutlined title="Confirmation awaiting" style={{ color: "red" }} />
}
