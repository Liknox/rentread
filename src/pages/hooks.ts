import { useRouter } from "@tanstack/react-router"
import { useEffect, useRef } from "react"

import { dom } from "@shared/lib"

/**
 * @hook Logic for resetting scroll position at every page
 */
export const useResetScrollAtEveryPage = () => {
   const router = useRouter()
   const prevPath = useRef<string>()

   useEffect(() => {
      // scroll to top, if pages changes, not params

      // @ts-expect-error this will cause an error
      const unsubscribe = router.subscribe(({ location }) => {
         if (prevPath.current !== location.pathname) {
            dom.scrollToTop()
         }

         prevPath.current = location.pathname
      }, {})

      return () => {
         unsubscribe()
      }
   }, [router])
}
