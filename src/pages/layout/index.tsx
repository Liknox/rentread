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
         <div className="fixed top-0 left-0 right-0 z-50">
            <DemoAlert />
            <Header />
         </div>
         <div className="mt-28">
            <Outlet />
         </div>
         <Footer />
      </AntLayout>
   )
}

export default Layout
