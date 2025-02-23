import { Alert } from "antd"

export const DemoAlert = () => (
   <Alert
      className="text-center hidden sm:flex"
      message="This is only a demo version of the service client. No real transactions or operations are being conducted!"
      type="info"
      closable={{
         closeIcon: <div>Close</div>,
      }}
   />
)
