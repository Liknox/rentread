import { useRouter } from "@tanstack/react-router"
import { useEffect, useRef } from "react"

import { dom } from "@shared/lib"

/**
 * @hook Логіка скидання скролінгу на кожній сторінці
 */
export const useResetScrollAtEveryPage = () => {
   const router = useRouter()
   const prevPath = useRef<string>()

   useEffect(() => {
      // Скролимо наверх, тільки якщо змінилась сторінка, але не параметри

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
