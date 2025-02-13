import Tile from "@shared/ui/tile"
import { Typography, Avatar, Layout, Divider } from "antd"
import { Wallet } from "features/wallet"
import { UserOutlined, CheckCircleOutlined, ClockCircleOutlined } from "@ant-design/icons"
import * as lib from "../lib"
import { viewerModel } from "entities/viewer"

export const Aside = () => {
   const viewer = viewerModel.useViewer()

   /* FIXME: move to entitites */
   return (
      <Layout.Sider className="" width={400}>
         <div className="p-10 text-center shadow-inset">
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
