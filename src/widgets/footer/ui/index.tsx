import { Layout } from "antd"

function Footer() {
   return (
      <Layout.Footer className="text-center">
         Rentread ©{new Date().getFullYear()} Created by{" "}
         <a href="https://github.com/Liknox/rentread" target="_blank" rel="noreferrer" className="text-primary">
            Nazar Koval
         </a>
      </Layout.Footer>
   )
}

export default Footer
