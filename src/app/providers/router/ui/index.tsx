import { RouterProvider, createRouter } from "@tanstack/react-router"
import { Button, Result, Spin } from "antd"
import { Suspense, useEffect, useState } from "react"

import { routeTree } from "@app/configs/router"

const LoadingSpinner = ({ delay = 300 }) => (
   <div className="overlay-container">
      <Spin delay={delay} className="overlay" size="large" />
   </div>
)

const router = createRouter({
   routeTree,
   context: {
      queryClient: null,
   },
   defaultPreload: "intent",
   defaultPreloadStaleTime: 0,
   defaultPendingComponent: () => <LoadingSpinner />,
   defaultErrorComponent: ({ error }) => (
      <Result
         status="error"
         title="Navigation Error"
         subTitle={error?.message || "An unexpected error occurred"}
         extra={[
            <Button type="primary" key="retry" onClick={() => window.location.reload()}>
               Retry
            </Button>,
         ]}
      />
   ),
})

declare module "@tanstack/react-router" {
   interface Register {
      router: typeof router
   }
}

const Router = () => {
   const [isRouterReady, setIsRouterReady] = useState(false)

   useEffect(() => {
      router
         .load()
         .then(() => {
            setIsRouterReady(true)
         })
         .catch(error => {
            console.error("Router initialization error:", error)
            setIsRouterReady(true)
         })
   }, [])

   if (!isRouterReady) {
      return <LoadingSpinner delay={100} />
   }

   return (
      <Suspense fallback={<LoadingSpinner />}>
         <RouterProvider router={router} />
      </Suspense>
   )
}

export { Router }
