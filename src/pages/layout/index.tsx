import { Layout as AntLayout } from "antd"
import { createRootRoute, Outlet } from "@tanstack/react-router"

import { Footer } from "widgets/footer"
import { Header } from "widgets/header"

import { useResetScrollAtEveryPage } from "@pages/hooks"

const Layout = () => {
   useResetScrollAtEveryPage()

   return (
      <AntLayout>
         <Header />
         <Outlet />
         <Footer />
      </AntLayout>
   )
}

export const Route = createRootRoute({
   component: Layout,
})
