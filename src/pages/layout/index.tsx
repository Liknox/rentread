import { Outlet } from "@tanstack/react-router"
import { Layout as AntLayout } from "antd"

import { Footer } from "widgets/footer"
import { Header } from "widgets/header"

import { useResetScrollAtEveryPage } from "@pages/hooks"
import { DemoAlert } from "@shared/ui/location-alert"

const Layout = () => {
   useResetScrollAtEveryPage()

   return (
      <AntLayout>
         <DemoAlert />
         <Header />
         <div className="mt-16 md:mt-0">
            <Outlet />
         </div>
         <Footer />
      </AntLayout>
   )
}

export default Layout
