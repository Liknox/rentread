import { Outlet } from "@tanstack/react-router"
import { Layout as AntLayout } from "antd"

import { Footer } from "widgets/footer"
import { Header } from "widgets/header"

import { useResetScrollAtEveryPage } from "@pages/hooks"
import { useMobileDetection } from "@shared/lib/browser"
import { DemoAlert } from "@shared/ui/location-alert"

/**
 * @page Layout Page
*/
const Layout = () => {
   useResetScrollAtEveryPage()
   const isMobile = useMobileDetection()

   return (
      <AntLayout className="min-h-screen flex flex-col">
         <DemoAlert />
         <Header />
         <div className={`flex-grow ${isMobile ? "mt-16 pt-2" : "mt-0"}`}>
            <Outlet />
         </div>
         <Footer />
      </AntLayout>
   )
}

export default Layout
