import { Layout as AntLayout, Spin } from "antd"

import { Footer } from "widgets/footer"
import { Header } from "widgets/header"

import { useResetScrollAtEveryPage } from "@pages/hooks"
import { DemoAlert } from "@shared/ui/location-alert"
import { Outlet } from "react-router-dom"
import { Suspense } from "react"

const Layout = () => {
   useResetScrollAtEveryPage()

   return (
      <AntLayout>
         <DemoAlert />
         <Header />
         <div className="mt-16 md:mt-0">
            <Suspense fallback={<Spin delay={300} className="overlay" size="large" />}>
               <Outlet />
            </Suspense>
         </div>
         <Footer />
      </AntLayout>
   )
}

export default Layout
