import { RouterProvider, createRouter } from "@tanstack/react-router"
import { Button, Result, Spin } from "antd"
import { Suspense, useEffect, useState } from "react"

import { routeTree } from "@app/configs/router"

interface LoadingSpinnerProps {
   delay?: number
}

const LoadingSpinner = ({ delay = 300 }: LoadingSpinnerProps) => (
   <div className="overlay-container">
      <Spin delay={delay} className="overlay" size="large" />
   </div>
)

const DefaultErrorFallback = ({ error }: { error: Error | unknown }) => {
   const message = error instanceof Error ? error.message : "An unexpected error occurred"
   return (
      <Result
         status="error"
         title="Navigation Error"
         subTitle={message}
         extra={[
            <Button type="primary" key="retry" onClick={() => window.location.reload()}>
               Retry
            </Button>,
         ]}
      />
   )
}

const router = createRouter({
   routeTree,
   context: {
      queryClient: null,
   },
   defaultPreload: "intent",
   defaultPreloadStaleTime: 0,
   defaultPendingComponent: () => <LoadingSpinner />,
   defaultErrorComponent: DefaultErrorFallback,
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
         .then(() => setIsRouterReady(true))
         .catch((error: unknown) => {
            console.error("[Router] Initialization failed:", error)
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
