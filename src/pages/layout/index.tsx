import { createRootRoute, Outlet } from "@tanstack/react-router"
import { TanStackRouterDevtools } from "@tanstack/router-devtools"
import { Footer } from "widgets/footer"
import { Header } from "widgets/header"

const Layout = () => {
   return (
      <div>
         <Header />
         <Outlet />
         <Footer />
         <TanStackRouterDevtools />
      </div>
   )
}

export const Route = createRootRoute({
   component: Layout,
})
