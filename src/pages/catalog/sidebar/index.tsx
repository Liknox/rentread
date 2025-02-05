import { Typography, Layout, Divider, Checkbox } from "antd"
import * as catalogParams from "../params"

function Sidebar() {
   return (
      <Layout.Sider width={400}>
         <div className="p-5 shadow-inset">
            <Typography.Title level={4} className="text-center">
               Filters
            </Typography.Title>
            {/* <AuthorSection /> */}
         </div>
      </Layout.Sider>
   )
}
