import { Outlet, createRootRoute } from "@tanstack/react-router"
import { Layout as AntLayout } from "antd"

import { Footer } from "widgets/footer"
import { Header } from "widgets/header"

import { useResetScrollAtEveryPage } from "@pages/hooks"
import { LocationAlert } from "@shared/ui/location-alert"

const Layout = () => {
   useResetScrollAtEveryPage()

   return (
      <AntLayout>
         <LocationAlert />
         <Header />
         <Outlet />
         <Footer />
      </AntLayout>
   )
}

export const Route = createRootRoute({
   component: Layout,
})
