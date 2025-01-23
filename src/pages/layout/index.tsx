import { createRootRoute, Outlet } from "@tanstack/react-router"
import { TanStackRouterDevtools } from "@tanstack/router-devtools"

const Layout = () => {
   return (
      <div>
         <p>Layout</p>
         <hr />
         <Outlet />
         <TanStackRouterDevtools />
      </div>
   )
}

export const Route = createRootRoute({
   component: Layout,
})
